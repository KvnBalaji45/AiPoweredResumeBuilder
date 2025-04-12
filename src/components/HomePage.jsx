import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function Homepage() {
  const navigate = useNavigate();

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/register');

  return (
    <div className="homepage-container">
      <h1 className="title">RESUME BUILDER</h1>

      <div className="content-wrapper">
        <div className="left-content">
          <h2>"Your Resume Speaks Before You Do."</h2>
          <p><i>Build an outstanding resume to stand out in your career journey.</i></p>
          <h2>"Your career story starts here."</h2>
          <p><i>Make your first impression count.</i></p>
        </div>

        <div className="right-content">
          <button className="sign-in" onClick={handleLogin}>Login</button>
          <button className="sign-up" onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
