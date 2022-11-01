import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navigation } from '../components/navigation';
import Home from '../pages/home';
import Tracker from '../pages/tracker';
import Search from '../pages/search';

function Index() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="tracker" element={<Tracker />} />
        <Route path="search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default Index;
