import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewsWrapper from './components/NewsWrapper'; // ✅ Correct import

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<NewsWrapper category="technology" />} />
        <Route path="/category/:categoryName" element={<NewsWrapper />} />
      </Routes>
    </Router>
  );
}


