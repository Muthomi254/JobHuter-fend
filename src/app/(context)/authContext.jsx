'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const BASE_URL = 'http://localhost:5000';

console.log('Base URL', BASE_URL);

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ isLoggedIn: true });
    }
  }, []);
  const register = async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return response.data;
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const login = async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/login `, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setUser(response.data.access_token); // Update user state with user data
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('loginTime', new Date().getTime()); // Set login time
        return response.data.user; // Return user data
      } else {
        throw new Error('Issue'); // Throw error if user data is missing
      }
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login Failed');
    }
  };

 const logout = async () => {
   try {
     await axios.post(`${BASE_URL}/logout`, null, {
       headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${localStorage.getItem('token')}`,
       },
     });
     setUser(null); // Clear user state
     localStorage.removeItem('token'); // Remove token from local storage
     localStorage.removeItem('loginTime'); // Remove login time from local storage
   } catch (error) {
     throw new Error('Logout Failed');
   }
 };


  const forgotPassword = async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/forgot-password`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, forgotPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};
