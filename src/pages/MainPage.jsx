import React from 'react';

import AppTheme from '../shared-theme/AppTheme.jsx';
import {
  Box,
  Container,
  TextField,
  Stack,
  Paper,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Button
} from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ShareIcon from '@mui/icons-material/Share';

import SwitcherMode from '../components/SwitcherMode.jsx';

import { getAllPosts, getMainPosts } from '../posts/index.js';
import ReactMarkdown from "react-markdown";
import lunr from 'lunr';

export default function MainPage(props) {

    const searchFieldRef = React.useRef(null);

    const [index, setIndex] = React.useState(null);
    const [documents, setDocuments] = React.useState([]);
    const [results, setResults] = React.useState([]);
    const [mainPosts, setMainPosts] = React.useState([]);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [resultMessage, setResultMessage] = React.useState('');

    React.useEffect(() => {
        const posts = getAllPosts();
        const mainPost = getMainPosts();
        const idx = lunr(function () {
            this.ref('eid');
            this.field('title');
            this.field('tag');
            this.field('body');

            posts.forEach(doc => this.add(doc));
        });
        setDocuments(posts);
        setIndex(idx);

        setMainPosts(mainPost);
    }, []);

    const handleSearch = () => {
        searchLunr();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchLunr();
        }
    }

    const searchLunr = () => {
        const keyword = searchFieldRef.current.value;
        
        if (index && keyword && keyword.trim().length > 1) {
            const searchResults = index.search(keyword);
            const matched = searchResults.map(r => documents.find(d => d.eid === r.ref));
            if (matched.length <= 0) {
                setOpenDialog(true);
                setResultMessage('We could not find anything for "' + keyword + '"');
            } else {
                setOpenDialog(false);
                setResultMessage('');
            }
            setResults(matched);
        } else {
            setOpenDialog(true);
            setResultMessage('Oops! You tried to search with an empty keyword that has no meaning. Please try again.');
            setResults([]);
        }
    }

    const handleDialogClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenDialog(false);
    };

    const actionDialog = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleDialogClose}>
                GOT IT
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleDialogClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <AppTheme {...props}>
            <Container sx={{
                minHeight: '100vh',
                width: { xs: 380, sm: 540, md: 680 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Paper
                sx={{
                    width: '100%',
                    maxWidth: 992,
                    height: '80vh',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
                >
                    <Typography variant='h1'>
                        { 'Nhat\'s memo' }
                    </Typography>
                    <Typography variant='p'>
                        <CodeIcon />
                        <AddBoxIcon />
                        <ShareIcon />
                    </Typography>
                    <SwitcherMode />
                    
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <TextField
                            placeholder="Search..."
                            fullWidth
                            variant="outlined"
                            size="small"
                            inputRef={searchFieldRef}
                            onKeyDown={handleKeyDown}
                        />
                        <IconButton aria-label="Search"
                            onClick={handleSearch}
                            sx={{
                                border: 1
                            }}
                        >
                            <SearchIcon />
                        </IconButton>
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={openDialog}
                            autoHideDuration={6000}
                            onClose={handleDialogClose}
                            message={resultMessage}
                            action={actionDialog}
                        />
                    </Box>
                    <Stack spacing={2} sx={{ overflowY: 'auto' }}>
                        {results.length <= 0 && mainPosts.map((post, idx) => {
                            if (idx === 0) {
                                return (
                                    <Accordion
                                        key={idx}
                                        sx={{
                                            boxShadow: 'none',
                                        }}
                                        defaultExpanded
                                    >
                                        <AccordionSummary
                                            expandIcon={<ArrowDropDownIcon />}
                                            aria-controls="panel2-content"
                                            id="panel2-header"
                                        >
                                            <ErrorIcon sx={{ color: 'rgb(212 72 23)' }} />
                                            <Typography component="span">{post.title}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box><ReactMarkdown>{post.body}</ReactMarkdown></Box>
                                        </AccordionDetails>
                                    </Accordion>
                                );
                            }

                            return (
                                <Accordion
                                    key={idx}
                                    sx={{
                                        boxShadow: 'none',
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                    >
                                        <Typography component="span">{post.title}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box><ReactMarkdown>{post.body}</ReactMarkdown></Box>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })}

                        {results.length >= 1 && results.map((post, idx) => (
                        <Accordion
                            key={idx}
                            sx={{
                                boxShadow: 'none',
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <Typography component="span">{post.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box><ReactMarkdown>{post.body}</ReactMarkdown></Box>
                            </AccordionDetails>
                        </Accordion>
                        ))}
                    </Stack>
                </Paper>
            </Container>
        </AppTheme>
    );
}