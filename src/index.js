import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route,
} from "react-router-dom";

import './index.css';
import Layout from './components/Layout';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />        
        </Routes>
        </Layout>
      </BrowserRouter>
    

  </React.StrictMode>
);

