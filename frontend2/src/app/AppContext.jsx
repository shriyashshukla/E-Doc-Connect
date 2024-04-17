
"use client"
import { useRouter } from 'next/navigation';
import React, { createContext, useContext } from 'react';
import { useState } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem('user')) || null
  );

  const [loggedIn, setLoggedIn] = useState(currentUser!==null);

  const login = (userData) => {
    setUser(userData);
    router.push('/');
  };

  const logout = () => {
    setUser(null);
    router.push('/login');
  useState()
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, currentUser, setCurrentUser, loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export default useAuth;
