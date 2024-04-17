'use client';
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './nav.jsx';
import { AuthProvider } from './AppContext.jsx';




const Template = ({ children }) => {

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])



  return (
    <AuthProvider>
      <Navbar />
      {children}
    </AuthProvider>

  );
}

export default Template;
