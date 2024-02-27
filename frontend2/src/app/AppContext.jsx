
"use client"
import { useRouter } from 'next/router';
import React, { createContext, useContext } from 'react';
import { useState } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

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
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
