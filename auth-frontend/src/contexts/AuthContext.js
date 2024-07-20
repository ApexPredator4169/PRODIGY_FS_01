import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);
    if (token) {
      axios.get('http://localhost:3001/user', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(response => {
        console.log('User data from server:', response.data);
        setCurrentUser(response.data);
      }).catch(error => {
        console.error('Error fetching user data:', error);
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  async function login(email, password) {
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      console.log('Login response:', response.data);
      localStorage.setItem('token', response.data.accessToken);
      setCurrentUser(response.data.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }


  async function signup(email, password) {
    return axios.post('http://localhost:3001/signup', { email, password });
  }

  function logout() {
    localStorage.removeItem('token');
    setCurrentUser(null);
  }

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}