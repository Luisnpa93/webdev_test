import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/pages/NavBar';
import Home from './components/pages/Home';
import OptionA from './components/pages/OptionA';
import OptionB from './components/pages/OptionB';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import './sass/main.scss';

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/option-a" element={<OptionA />} />
          <Route path="/option-b" element={<OptionB />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element= {<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
