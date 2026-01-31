import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Force usage of Render URL in production to prevent 405 errors
if (import.meta.env.PROD) {
  axios.defaults.baseURL = "https://mern-fleet-app.onrender.com";
} else {
  axios.defaults.baseURL = ""; // Use proxy in dev
}

console.log("Axios Base URL Set To:", axios.defaults.baseURL);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
