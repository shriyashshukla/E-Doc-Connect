'use client';
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login/page.jsx';


const Template = ({children}) => {

    useEffect(()=>{
        require('bootstrap/dist/js/bootstrap.bundle.min.js')
    },[])


        
  return (
    <>
        <Navbar/>
        {children}
      
    </>
  );
}

export default Template;
