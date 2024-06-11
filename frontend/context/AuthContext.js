"use client";
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  // const [userLogged, setUserLogged] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await fetch(
        "https://mate-dragons-production.up.railway.app/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      // console.log(username, password);

      if (response.ok) {
        const data = await response.json();
        const decodedToken = jwtDecode(data.token); // Decodificar el token almacenado
        // console.log(decodedToken); // Verificar contenido del token
        setToken(data.token);
        // setUserLogged(decodedToken.username);
        setDecodedToken(decodedToken);
        if (decodedToken.roles && decodedToken.roles.length > 0) {
          setRole(decodedToken.roles[0]); // Asegurar la obtención del rol
        } else {
          setRole(null);
          // setUserLogged(null);
          setDecodedToken(null);
        }
        localStorage.setItem("token", data.token);
        // alert(
        //   "Login exitoso como " +
        //     decodedToken.username +
        //     " con el rol " +
        //     decodedToken.roles[0] +
        //     "."
        // );
        toast.success(
          "Login exitoso como " +
            decodedToken.username +
            " con el rol " +
            decodedToken.roles[0] +
            "."
        );
      } else {
        const errorData = await response.json();
        // alert("Login fallido: ", errorData);
        toast.error("Login fallido: " + errorData.name + errorData.message);
        throw new Error(errorData.message);
      }
    } catch (error) {
      // alert("Ocurrió un error: ", error);
      toast.error("Ocurrió un error: " + error.message);
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    setDecodedToken(null);
    // setUserLogged(null);
    // alert("Has cerrado sesión");
    toast.success("Has cerrado sesión exitosamente");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      // console.log(decodedToken);
      setToken(storedToken);
      // setUserLogged(decodedToken.username);
      setDecodedToken(decodedToken);
      // Si el token posee el array roles y el mismo es mayor a 0
      if (decodedToken.roles && decodedToken.roles.length > 0) {
        setRole(decodedToken.roles[0]);
      } else {
        setRole(null);
        // setUserLogged(null);
        setDecodedToken(null);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ decodedToken, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
