'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
export const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const register = async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Request data:', formData); // Log request data
      console.log('Response data:', response.data); // Log response data
      return response.data;
    } catch (error) {
      console.error('Registration error:', error); // Log registration error
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
      setUser(null);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error:', 'Logout Failed');
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
      console.log(response.data);
    } catch (error) {
      console.error('Forgot password error:', 'Forgot-password Failed');
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
