import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// This finds the <div id="root"> in your index.html
const rootElement = document.getElementById('root');

// This tells React to take control of that div
const root = ReactDOM.createRoot(rootElement);

// This renders your main <App /> component inside that div
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);