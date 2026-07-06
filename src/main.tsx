import { StrictMode } from 'react';
import emailjs from '@emailjs/browser';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
if (publicKey) {
  emailjs.init(publicKey);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
