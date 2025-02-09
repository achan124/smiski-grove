import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './style.css';

// Firebase Imports
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Import Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyAvMl79ljv-ik_QJlFHoiAVcGaft4qTO4w",
  authDomain: "smiski-grove.firebaseapp.com",
  databaseURL: "https://info340-smiskis-default-rtdb.firebaseio.com", // Realtime Database URL
  projectId: "smiski-grove",
  storageBucket: "smiski-grove.firebasestorage.app",
  messagingSenderId: "995569964241",
  appId: "1:995569964241:web:c62488788a3b3e69dde1f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Services
export const auth = getAuth(app);
export const db = getDatabase(app);

// Render React App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);