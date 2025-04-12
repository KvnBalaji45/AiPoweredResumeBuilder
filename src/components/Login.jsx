import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // your existing CSS

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const validUser = storedUsers.find(
      user => user.username === username && user.password === password
    );

    if (validUser) {
      navigate('/resumehome');
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <h1 className="login-heading">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        {error && <p className="login-error">{error}</p>}
        <button onClick={handleLogin} className="login-button">Login</button>
        <p className="login-register">
          Don't have an account?{' '}
          <Link to="/register" className="login-link">Register here</Link>
        </p>
      </div>
    </div>
  );
}
