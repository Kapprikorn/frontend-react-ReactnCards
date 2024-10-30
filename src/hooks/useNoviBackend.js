import { useState } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth.js';

const useNoviBackend = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { storeToken, token } = useAuth();

  // Base URL for the Novi API
  const BASE_URL = 'https://api.datavortex.nl/reactncards';
  const NOVI_API_KEY = import.meta.env.VITE_NOVI_BACKEND_API_KEY;

  // Generic API request function
  const _apiRequest = async (endpoint, method = 'GET', data = {}) => {
    setLoading(true);
    setError(null);
    try {
      const headers = {
        'Content-Type': 'application/json',
        'X-Api-Key': NOVI_API_KEY,
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await axios({
                                     url: `${BASE_URL}${endpoint}`,
                                     method,
                                     headers,
                                     data,
                                   });
      return response.data;
    } catch (err) {
      console.error('API Request Error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const data = await _apiRequest(
        '/users/authenticate',
        'POST',
        { username, password }
      );
      storeToken(data.jwt);
      return data;
    } catch (err) {
      setError('Login failed: Please check your credentials.');
      throw err;
    }
  };

  const register = async (username, password) => {
    try {
      return await _apiRequest('/users',
                               'POST',
                               { username, password, email: `${username}@novi-education.nl` }
      );
    } catch (err) {
      setError(`Registration failed: ${err.response.data}`);
      throw err;
    }
  };

  const fetchUserData = async () => {
    try {
      return await _apiRequest('/user');
    } catch (err) {
      console.error('Error fetching user data:', error);
      throw err;
    }
  };

  return { login, register, fetchUserData, loading, error };
};

export default useNoviBackend;