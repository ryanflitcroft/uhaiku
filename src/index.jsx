import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import AuthProvider from './context/AuthProvider';
import HaikuProvider from './context/HaikuProvider';

render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <HaikuProvider>
          <App />
        </HaikuProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
