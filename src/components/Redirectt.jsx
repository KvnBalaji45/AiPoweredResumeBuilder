import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Register from './Register';
import Login from './Login';
import Home from './Home';
import Editor from './Editor';

import Homepage from './HomePage';
import ATSChecker from './ATSChecker';
import ClassicResume from './ClassicResume';
import MinimalResume from './MinimalResume';
import CreativeResume from './CreativeResume';

export default function Redirectt() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resumehome" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/ATSCHECKER" element={<ATSChecker />} />
        {/* Corrected the way of defining route element for React Router v6 */}
        <Route path="/resume-template/1" element={<ClassicResume />} />
        <Route path="/resume-template/2" element={<MinimalResume />} />
        <Route path="/resume-template/3" element={<CreativeResume />} />
        <Route path="*" element={<Homepage />} /> {/* Catch-all for undefined routes */}
      </Routes>
    </div>
  );
}
