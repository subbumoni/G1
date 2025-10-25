import * as React from "react";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (token) {
      setAuthenticated(true);
    }
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const login = (credentials) => {
    setAuthenticated(true);
    setUser(credentials);
  };

  const logout = () => {
    localStorage.removeItem("token")
     localStorage.removeItem("user");
    setAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};




// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//     } catch (err) {
//       console.error("Error parsing user from localStorage", err);
//       setUser(null);
//     }
//   }, []);

//   const login = (userData, token) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(userData));
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };






// import React, { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [authenticated, setAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userStr = localStorage.getItem("user");
//     if (token) setAuthenticated(true);
//     if (userStr) setUser(JSON.parse(userStr));
//   }, []);

//   const login = (data) => {
//     localStorage.setItem("token", data.token);
//     localStorage.setItem("user", JSON.stringify(data.user));
//     setUser(data.user);
//     setAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     setAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ user, authenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

