import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Переконайся, що тут правильний шлях і розширення
import './index.css';     // Або твої глобальні стилі

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);