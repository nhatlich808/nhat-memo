import React, { useEffect, useState } from 'react'
import nhatLogo from '/nhat.svg'
import './App.css'
import {
  Typography,
  Box,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import CheckIcon from '@mui/icons-material/Check';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import CopyrightIcon from '@mui/icons-material/Copyright';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import lunr from 'lunr';
import Papa from 'papaparse';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [resultVisiable, setResultVisiable] = useState(0);
  const [index, setIndex] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [displayUpdateNotice, setDisplayUpdateNotice] = useState(false);

  const GSHEET_API_DATA = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRLpQjIlEUgchgcAAPYlFwwtCpAUMgcom9rdZhiwGgnaEmUihqXYnWSyVCHn52U0nQfwnIkVr_Zc3oK/pub?output=csv';
  const GSHEET_API_VERSION = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSRSgP8OQ8GGHrtxyF-DgxmJ3JgWAiSAbjXslvaTwC-Y3mlLYQ9WDuhnohB8gXc_f_5riSJl_C3khws/pub?output=csv';

  useEffect(() => {
    const fetchData = async () => {
      fetch(GSHEET_API_DATA)
      .then(res => res.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          complete: results => {
            setDocuments(results.data);
            const idx = lunr(function () {
              this.ref('id');
              this.field('title');
              this.field('content');
              this.field('tags');

              results.data.forEach(doc => this.add(doc));
            });

            setIndex(idx);
          }
        });
      });
    };

    // const fetchVersion = () => {
    //   fetch(GSHEET_API_VERSION)
    //   .then(res => res.text())
    //   .then(csv => {
    //     Papa.parse(csv, {
    //       header: true,
    //       skipEmptyLines: true,
    //       complete: results => {
    //         const newVerData = results.data;
    //         const newVer = newVerData[0]['name'];

    //         setCurVersion(newVer);
    //       }
    //     });
    //   });
    // };

    fetchData();
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
    if (index && keyword.trim().length > 1) {
      const results = index.search(keyword);
      const matched = results.map(r => documents.find(d => d.id === r.ref));
      setResults(matched);
    } else {
      setSnackOpen(true);
      setResults([]);
    }
    setResultVisiable(1);
  }

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  }

  const actionSnack = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Box component="section"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        alignItems: 'center',
        backgroundColor: '#fff'
      }}
    >
      <Box component="section" className="header-wrapper" sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          height: '160px',
          borderBottom: '1px dotted #bbbbbb',
          mb: 2 }}
        >
        <Box component="div" className="header-ico">
          <Box
            component="img"
            alt="Nhat icon header"
            src={nhatLogo}
          />
        </Box>
        <Paper
          component="div"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 450 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Enter keyword"
            inputProps={{ 'aria-label': 'search' }}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setKeyword(e.target.value);
              setResultVisiable(0);
            }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
          <Snackbar
            open={snackOpen}
            autoHideDuration={6000}
            onClose={handleSnackClose}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            action={actionSnack}
            message="Oops! You left the search keyword blank. Please enter a keyword and press Enter or click the Search button to search."
          />
        </Paper>
        <Paper
          elevation={0}
          component="span"
          sx={{ marginLeft: 3, padding: 2 }}
        >
          {displayUpdateNotice && (
            <Tooltip title="Some data has changed, please refresh page to update new data.">
              <IconButton>
                <AnnouncementIcon />
              </IconButton>
            </Tooltip>
          )}
        </Paper>
      </Box>
      <Box component="section" className="content-wrapper" sx={{ paddingTop: '15px', flex: 1 }}>
        <Alert severity="info" sx={{mb: 2}}>Explore the search terms on <Link href="https://lunrjs.com/guides/searching.html">Lunr</Link>.</Alert>

        {results.length === 0 && keyword.length === 0 && (<Paper elevation={0}
          component="div"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 450 }}
        ><TipsAndUpdatesIcon sx={{color: '#443eff'}} /> Try entering a keyword to search...</Paper>)}

        {results.length === 0 && keyword.length > 0 && resultVisiable === 1 && (<Paper elevation={0}
          component="div"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 450 }}
        ><SentimentDissatisfiedIcon sx={{color: '#8f723c'}} /> We could not find anything match your keyword.</Paper>)}

        {results.map(post => (
          <Paper key={post.id} elevation={0} className="result-item" sx={{
            maxWidth: 720,
            textAlign: 'left',
            margin: '16px 0',
            boxShadow: '0 1px #e0e0e0',
            borderRadius: 0,
            display: 'flex',
            alignItems: 'top'
          }}>
            <Box component="section" className="item-content" sx={{flex: 1, paddingBottom: '8px'}}>
              <Typography component="h4" sx={{fontSize: '2em'}}>
                <CheckIcon sx={{color: '#4242e1'}} /> {post.content}
              </Typography>
              <Stack spacing={1} direction="row" sx={{ alignItems: 'center' }}>
                {post.tags.split(',').map(tag => (
                  <Chip label={tag} size="small" color="primary" variant="outlined" />
                ))}
              </Stack>
            </Box>
            <Tooltip title={post.title} sx={{width: 48, height: 48}}>
              <IconButton>
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </Paper>
        ))}
      </Box>
      <Box component="section" className="footer-wrapper" sx={{
        width: '100%',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Paper className="copyright-item" >
          <Typography component="p">
            <CopyrightIcon sx={{verticalAlign: 'middle'}} /> <Link href="/" underline="none">NHAT memo</Link> {new Date().getFullYear()}
          </Typography>
        </Paper>
      </Box>
    </Box>
  )
}

export default App
