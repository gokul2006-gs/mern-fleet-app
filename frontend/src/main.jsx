import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios';

// Set the base URL for axios requests
// In production, VITE_API_URL should be set to your backend URL (e.g., https://my-api.onrender.com)
// In development, it falls back to empty string to use the Vite proxy defined in vite.config.js
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "";

import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
