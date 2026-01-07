import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ServerProvider } from './context/ServerContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ServerProvider>
      <App />
    </ServerProvider>
  </React.StrictMode>
);
