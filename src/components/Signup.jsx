import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, set } from 'firebase/database'; // Import Realtime Database methods
import { auth, db } from '../main'; // Use Realtime Database instead of Firestore

export function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Handle form field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Clear previous errors
    setSuccessMessage(''); // Clear previous success messages

    const { username, email, password, confirmPassword } = formData;

    console.log('Form Data:', formData); // Debugging log

    // Input validation
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords must match');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with username
      await updateProfile(user, {
        displayName: username,
      });

      console.log('User created:', user);

      // Save user data to Realtime Database
      const userRef = ref(db, `users/${user.uid}`); // Create user-specific path
      await set(userRef, {
        userId: user.uid,
        username: username,
        email: email,
        createdAt: new Date().toISOString(),
      });

      console.log('Data written successfully to Realtime Database');

      // Show success message and navigate to login page
      setSuccessMessage('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Database Write Error:', error);
      setErrorMessage(
        error.code === 'auth/email-already-in-use'
          ? 'Email is already in use'
          : 'An error occurred. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="login-content login-form">
        <header>
          <h1>Create an Account</h1>
          <h2 className="login-text">Get started to unlock all features of Smiski Grove</h2>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="input form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
              required
            />
          </div>

          <div className="input form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              required
            />
          </div>

          <div className="input form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
              required
            />
          </div>

          <div className="input form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              name="confirmPassword"
              onChange={handleInputChange}
              value={formData.confirmPassword}
              required
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <button className="primary-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>

          <h2 className="login-text">Already have an account?</h2>
          <NavLink to="/login" className="primary-button secondary-button">
            Log-In
          </NavLink>
        </form>
      </div>
    </div>
  );
}
