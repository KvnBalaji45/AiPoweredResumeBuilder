import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const users = [
    { username: 'gopi', password: 'gopi123' },
    { username: 'randy', password: 'orton123' },
    { username: 'sachin', password: 'sachin123' },
    { username: 'rohit', password: 'rohit123' },
    { username: 'virat', password: 'virat123' },
    { username: 'balaji', password: 'balaji123' },
    { username: 'katrina', password: 'katrina123' },
    { username: 'priya', password: 'priya123' },
    { username: 'rahul', password: 'rahul123' },
    { username: 'ajay', password: 'ajay123' }
  ];

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const validUser = users.find(user => user.username === username && user.password === password);

    if (validUser) {
      // ✅ Successful login
      navigate('/resumehome');
    } else {
      // ❌ Invalid login
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.loginContainer}>
        <h1 style={styles.heading}>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        {error && <p style={styles.errorText}>{error}</p>}
        <button onClick={handleLogin} style={styles.button}>Login</button>
        <p style={styles.registerText}>
          Don't have an account?{' '}
          <Link to="/register" style={styles.link}>Register here</Link>
        </p>
      </div>
    </div>
  );
}

// ✅ Inline styles
const styles = {
  body: {
    backgroundColor: '#f5f5dc',
    fontFamily: 'Arial, sans-serif',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    textAlign: 'center',
    backgroundColor: '#f4f7fa',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    width: '350px',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#444',
    marginBottom: '20px',
  },
  input: {
    color: '#000',
    margin: '10px 0',
    padding: '10px',
    width: '280px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    backgroundColor: '#f0f2f5',
    transition: 'all 0.3s',
    outline: 'none',
    boxShadow: '0 0 10px rgba(0, 123, 255, 0.2)',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '12px 40px',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
    transform: 'translateY(-3px)',
  },
  errorText: {
    color: 'red',
    fontSize: '14px',
    marginTop: '10px',
  },
  registerText: {
    marginTop: '15px',
    fontSize: '14px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.3s',
  },
};

