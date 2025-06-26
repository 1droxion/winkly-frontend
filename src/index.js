import React from 'react';
import ReactDOM from 'react-dom/client';
import Wrapper from './App'; // make sure App.jsx exports `Wrapper`
import './App.css';

// ✅ Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((reg) => console.log('✅ Service Worker registered:', reg.scope))
      .catch((err) => console.error('❌ Service Worker failed:', err));
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Wrapper />);
