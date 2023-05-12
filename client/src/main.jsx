import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { SearchContextProvider } from './context/SearchContext';
import { AuthContextProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <ToastContainer />
        <App />
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
