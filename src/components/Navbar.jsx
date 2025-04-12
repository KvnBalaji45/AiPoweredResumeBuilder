import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear login session if you're storing any session logic
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/resumehome">Home</Link>
      </div>
      <div className="navbar-links">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
