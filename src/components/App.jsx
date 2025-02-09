import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'; // Import Firebase auth methods
import { auth } from '../main'; // Import the auth service from main.jsx

// Component Imports
import { NavBar, Footer } from './Navigation';
import { HomePage } from '../pages/Home';
import { LoginPage } from './Login';
import { SignupPage } from './Signup';
import { ProfilePage } from './Profile';
import { MySmiskisPages } from '../pages/mySmiskis';
import { SearchPage } from '../pages/Search';
import { OddOneOut } from '../pages/OddOneOut';
import MemoryMatch from '../pages/memoryMatch';
import SMISKI_IMAGES from '../data/smiski-img.json';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null); // User state
  const [wishlist, setWishlist] = useState([]);
  const [collection, setCollection] = useState([]);
  const [gameStats, setGameStats] = useState({
    oddOneOut: { easy: null, medium: null, hard: null },
    memoryMatch: { easy: null, medium: null, hard: null },
  });

  const handleAddToWishlist = (item) => {
    setWishlist((prev) => [...prev, item]);
  };
  
  const handleAddToCollection = (item) => {
    setCollection((prev) => [...prev, item]);
  };

  const handleRemoveFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.name !== id));
  };
  
  const handleRemoveFromCollection = (id) => {
    setCollection((prev) => prev.filter((item) => item.name !== id));
  };

  // Monitor user authentication state with Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        console.log('Signed in as:', firebaseUser.displayName || 'User');
        setCurrentUser({
          userId: firebaseUser.uid,
          userName: firebaseUser.displayName || 'User',
          userEmail: firebaseUser.email,
          userImg: firebaseUser.photoURL || '/img/default-profile.png',
        });
      } else {
        console.log('No user signed in');
        setCurrentUser(null);
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="container-fluid d-flex flex-column my-5 pt-5">
      <NavBar username={currentUser?.userName || 'Guest'} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/search" element={<SearchPage smiskiImg={SMISKI_IMAGES} onAddToWishlist={handleAddToWishlist} onAddToCollection={handleAddToCollection}/>} />
        <Route path="/mySmiskis" element={<MySmiskisPages wishlist={wishlist} collection={collection} removeFromWishlist={handleRemoveFromWishlist} removeFromCollection={handleRemoveFromCollection}/>} />
        <Route path="/memoryMatch" element={<MemoryMatch setGameStats={setGameStats}/>} />
        <Route path="/oddOneOut" element={<OddOneOut setGameStats={setGameStats} />} />
        
        <Route element={<ProtectedPage currentUser={currentUser} />}>
          <Route path="/profile" element={<ProfilePage currentUser={currentUser} gameStats={gameStats}/>} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

// ProtectedPage Component
function ProtectedPage({ currentUser }) {
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
