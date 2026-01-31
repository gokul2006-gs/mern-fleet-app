import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios';

import axios from 'axios';

// Set the base URL for axios requests
// Logic: 
// 1. If we are in PROD, use VITE_API_URL. 
// 2. If VITE_API_URL is missing in PROD, fallback to the hardcoded Render URL (failsafe).
// 3. If we are in DEV (localhost), use "" to use the Vite proxy.
const outputBackendUrl = import.meta.env.VITE_API_URL || "https://mern-fleet-app.onrender.com";

if (import.meta.env.PROD) {
  axios.defaults.baseURL = outputBackendUrl;
} else {
  axios.defaults.baseURL = ""; // Use proxy in dev
}

console.log("Current Mode:", import.meta.env.MODE);
console.log("Axios Base URL:", axios.defaults.baseURL);

import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
