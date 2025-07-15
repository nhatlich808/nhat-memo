import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from './pages/MainPage.jsx';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '@fontsource/cinzel/600.css';

import './index.css';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
