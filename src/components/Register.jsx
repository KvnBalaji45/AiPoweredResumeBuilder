import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

export default function Register() {
  return (
    <div className="login-container">
      <h2>Register</h2>
      <form>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" name="confirm-password" />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}
