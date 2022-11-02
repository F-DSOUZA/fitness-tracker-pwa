import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Index from './components/index';
import { TrackerDataProvider } from './components/context';

function App() {
  return (
    <TrackerDataProvider>
      <Index />
    </TrackerDataProvider>
  );
}

export default App;
