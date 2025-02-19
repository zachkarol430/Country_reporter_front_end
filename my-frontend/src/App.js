import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Capital from './components/Capital';
import './index.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/capital/:capitalName" element={<Capital />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;