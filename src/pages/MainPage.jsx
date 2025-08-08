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
  Button,
  Alert
} from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import ErrorIcon from '@mui/icons-material/Error';
import CodeIcon from '@mui/icons-material/Code';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ShareIcon from '@mui/icons-material/Share';
import FaceIcon from '@mui/icons-material/Face';

import SwitcherMode from '../components/SwitcherMode.jsx';
import SwitcherSearchEngine from '../components/SwitcherSearchEngine.jsx';

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

    const [contentGenerating, setContentGenerating] = React.useState(false);
    const [resultOriginal, setResultOriginal] = React.useState('local');
    const [searchEngine, setSearchEngine] = React.useState('lorda');

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
            if (searchEngine === 'lorda') {
                searchLorda(keyword);
            } else {
                const searchResults = index.search(keyword);
                const matched = searchResults.map(r => documents.find(d => d.eid === r.ref));
                if (matched.length <= 0) {
                    setOpenDialog(true);
                    setResultMessage('No results found for the `' + keyword + '` keyword in NOTE. Try searching with Lorda AI instead.');
                    setResults([]);
                } else {
                    setOpenDialog(false);
                    setResultMessage('');
                    setResults(matched);
                }
                setResultOriginal('local');
            }
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

    const searchLorda = async (keyword) => {
        try {
            setContentGenerating(true);
            const res = await fetch('https://nhat-memo-workers-ai.nhatlich808.workers.dev/', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: keyword }),
            });
            
            // streaming
            const reader = res.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let fullText = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split("\n").filter(line => line.startsWith("data:"));
                for (const line of lines) {
                    try {
                        const jsonStr = line.replace(/^data:\s*/, "");
                        const data = JSON.parse(jsonStr);
                        if (data.response) {
                            fullText += data.response;
                            setResults([{
                                'body': fullText,
                                'author': 'Lorda',
                                'date': '',
                                'eid': 1,
                                'excerpt': '',
                                'slug': '',
                                'tag': keyword,
                                'title': '`' + keyword + '`',
                            }]);
                        }
                    } catch (err) {
                        // 
                    }
                }
                setContentGenerating(false);
            }
            setResultOriginal('lorda');
            setContentGenerating(false);
        } catch (e) {
            setResults([]);
            setContentGenerating(false);
        } finally {
            setContentGenerating(false);
        }
    }

    const switchSearchEngineHandle = (event) => {
        setSearchEngine(event.target.value);
    }

    const actionDialog = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleDialogClose}>
                GOT IT
            </Button>
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
                    <SwitcherSearchEngine defaultSearchEngine={searchEngine} switchSearchEngineHandle={switchSearchEngineHandle} />
                    
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <TextField
                            disabled={contentGenerating}
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
                    {resultOriginal === 'lorda' && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="warning">{ 'This search result is AI-generated and may contain inaccuracies. Please verify against official documentation or trusted sources.' }</Alert>
                        </Stack>
                    )}
                    <Stack spacing={2} sx={{ overflowY: 'auto' }}>
                        {!contentGenerating && searchEngine == 'lorda' && results.length <= 0 && (
                            <Typography sx={{
                                height: 100,
                                textAlign: 'center',
                                width: '100%',
                                marginTop: 40
                            }}>{ 'What are you looking for?' }</Typography>
                        )}
                        {!contentGenerating && searchEngine == 'local' && results.length <= 0 && mainPosts.map((post, idx) => {
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

                        {!contentGenerating && resultOriginal !== 'lorda' && results.length >= 1 && results.map((post, idx) => (
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
                        {!contentGenerating && resultOriginal === 'lorda' && results.length >= 1 && results.map((post, idx) => (
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
                                <FaceIcon />
                                <Typography component="span" sx={{ marginLeft: '8px' }}>{ post.title }</Typography>
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