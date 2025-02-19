// import React, { createContext, useContext, useState, useEffect } from 'react';
// import API from '../services/api';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token') || null);

//   // Check if user is logged in on initial load
//   useEffect(() => {
//     if (token) {
//       const fetchUser = async () => {
//         try {
//           const { data } = await API.get('/auth/me');
//           setUser(data);
//         } catch (err) {
//           console.error('Failed to fetch user:', err);
//           logout();
//         }
//       };
//       fetchUser();
//     }
//   }, [token]);

//   const login = (token) => {
//     localStorage.setItem('token', token);
//     setToken(token);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken); // ✅ Fetch user only if token exists
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const { data } = await API.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
      setUser(data);
      console.log('✅ User fetched:', data);
    } catch (err) {
      console.error('❌ Failed to fetch user:', err.message);
      setUser(null);
    }
  };

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    fetchUser(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
