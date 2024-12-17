import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(() => !localStorage.getItem('user')); // Set loading to false if user exists in localStorage

  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        try {
          const response = await axios.get('/api/user');
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data)); // Persist user
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [user]);

  // Synchronize localStorage with user state
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const resetUser = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear user from localStorage
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
