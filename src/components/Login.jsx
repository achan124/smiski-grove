import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../main'; // Import auth from your Firebase initialization file

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission from refreshing the page
    setErrorMessage(''); // Clear any previous error messages



    try {
      // Use Firebase to authenticate the user
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');
      navigate('/home'); // Redirect the user to the home page upon successful login
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Invalid email or password'); // Display an error message
    }
  };

  return (
    <div className="login-content login-form">
      <header>
        <h1>Log-In</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="input form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="input form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className="primary-button">Log-In</button>
        <h2 className="login-text">Don't have an account yet?</h2>
        <NavLink to="/signup" className="primary-button secondary-button">Create an Account</NavLink>
      </form>
    </div>
  );
}
