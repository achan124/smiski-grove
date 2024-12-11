import React, { useState } from 'react';
import { updateProfile, updateEmail, updatePassword, signOut } from 'firebase/auth'; // Import signOut
import { useNavigate } from 'react-router-dom'; // Import navigation
import { auth } from '../main'; // Adjust the import path to your Firebase initialization file

export function ProfilePage({ gameStats }) {
  const currentUser = auth.currentUser; // Get the current user
  const [username, setUsername] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState(''); // For updating password
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate(); // For navigation after sign out

  const maskedPassword = '*'.repeat(10); // Display a fixed-length masked password

  const handleUpdate = async () => {
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Update username (if changed)
      if (username && username !== currentUser.displayName) {
        await updateProfile(auth.currentUser, { displayName: username });
      }

      // Update email (if changed)
      if (email && email !== currentUser.email) {
        await updateEmail(auth.currentUser, email);
      }

      // Update password (if provided)
      if (password) {
        await updatePassword(auth.currentUser, password);
      }

      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update profile. Please try again.');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Error signing out:', error);
      setErrorMessage('Failed to sign out. Please try again.');
    }
  };

  return (
    <div>
      <header>
        <h1 className="my-5 pt-5">My Profile</h1>
      </header>

      <div className="profile-cards">
        <div className="profile-card profile-info-card">
          <div className="d-flex justify-content-center">
            <img
              className="profile-pic"
              src="img/Smiski-onYourSide.png"
              alt="Profile Photo"
            />
            <h2 className="profile-card-title">
              {isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              ) : (
                username || 'Guest'
              )}
            </h2>
          </div>
          <div className="profile-card-content">
            <p>
              Email:{' '}
              {isEditing ? (
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                email
              )}
            </p>
            <p>
              Password:{' '}
              {isEditing ? (
                <input
                  type="password"
                  className="form-control"
                  placeholder="New password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              ) : (
                maskedPassword
              )}
            </p>
            <div className="d-flex flex-column align-items-center mt-4">
              {isEditing ? (
                <button
                  className="primary-button save-profile mb-3"
                  onClick={handleUpdate}
                >
                  Save
                </button>
              ) : (
                <button
                  className="primary-button edit-profile mb-3"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              )}
              <button
                className="signout-button"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className="profile-card profile-stats-card">
          <div className="d-flex justify-content-center">
            <h2 className="profile-card-title text-light">Game Stats</h2>
          </div>
          <div className="profile-card-content">
            <h3 className="h5">Memory Match</h3>
            <p>Easy: {gameStats?.memoryMatch.easy || '-'}</p>
            <p>Medium: {gameStats?.memoryMatch.medium || '-'}</p>
            <p>Hard: {gameStats?.memoryMatch.hard || '-'}</p>
            <h3 className="h5">Odd One Out</h3>
            <p>Easy: {gameStats?.oddOneOut.easy || '-'}</p>
            <p>Medium: {gameStats?.oddOneOut.medium || '-'}</p>
            <p>Hard: {gameStats?.oddOneOut.hard || '-'}</p>
          </div>
        </div>
      </div>

      {/* Display success or error messages */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
