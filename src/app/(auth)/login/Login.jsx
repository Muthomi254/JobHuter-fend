'use client';

import React, { useState } from 'react';
import { useAuth } from '../../(context)/authContext';
import Swal from 'sweetalert2';

export default function Page() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@, $, !, %, *, ?, &)',
      });
      return;
    }

    try {
      await login({ email, password });
      // Redirect to /Cv on successful login
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Login successful!',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = '/Cv';
      });
    } catch (error) {
      // Handle login error
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Login failed. Please try again!',
      });
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="max-w-md w-full px-4" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@example.com"
            required
          />
        </div>
        <div className="mb-5 relative">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500"
          >
            Your password
          </label>

          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M0 10s3-5 10-5 10 5 10 5-3 5-10 5S0 10 0 10zm10-3a3 3 0 100 6 3 3 0 000-6z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M0 10s3-5 10-5 10 5 10 5-3 5-10 5S0 10 0 10zm6 0a4 4 0 118 0 4 4 0 01-8 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="flex items-center mb-5 text-sm font-small text-gray-500">
          New here?
          <a
            href="/register"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-600 font-small text-xs hover:underline ml-2"
          >
            Register
          </a>
        </div>
        <div className="flex items-center mb-5">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
          <div className="ml-20">
            <a
              href="/forgotPassword"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-600 font-small text-xs hover:underline ml-20"
            >
              Forgot Password?
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
