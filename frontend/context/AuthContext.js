"use client"
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("admin");

  const login = (newRole) => {
    setIsAuthenticated(true);
    setRole(newRole);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
