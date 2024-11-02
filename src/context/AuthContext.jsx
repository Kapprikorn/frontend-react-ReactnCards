import { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => localStorage.getItem('token')
  );

  const storeToken = (jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem('token', jwtToken);
  };

  const removeToken = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const isTokenValid = () => {
    if (!token) return false;
    try {
      const decodeToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decodeToken.exp > currentTime;
    } catch (err) {
      console.error("JWT token validation error: ", err);
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{ token, storeToken, removeToken, isTokenValid }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;