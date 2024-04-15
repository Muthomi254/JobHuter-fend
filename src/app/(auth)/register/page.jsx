'use client';

import React, { useState } from 'react';
import { useAuth } from '../../(context)/authContext'; // Import the useAuth hook
import Swal from 'sweetalert2'; // Import SweetAlert

export default function Page() {
  const { register } = useAuth();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const isSecurePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    return (
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar &&
      isLongEnough
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = document.getElementById('floating_email').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;

    if (password !== confirm_password) {
      setError('Password confirmation does not match');
      return;
    }

    if (!isSecurePassword(password)) {
      setError(
        'Password must contain at least 8 characters including uppercase, lowercase, number, and special character.'
      );
      return;
    }

    try {
      await register({ email, password, confirm_password });
      // If registration succeeds, show success message and redirect to login page
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have successfully registered!',
      }).then(() => {
        window.location.href = '/login';
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'An error occurred while registering. Please try again later.',
      });
      setError('Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="max-w-md w-full px-4" onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="floating_email"
            className="block mb-2 text-sm font-medium  "
          >
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="floating_email"
            className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="email@example.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-grey-900 "
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              required
            />
            {/* Button to toggle password visibility */}
            <button
              type="button"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 12a2 2 0 113.999-.001A2 2 0 017 12z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-grey-900 "
          >
            Confirm password
          </label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex items-start mb-5 text-sm font-small text-grey-900">
          Already have an account?
          <a
            href="/login"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-600 font-medium  hover:underline ml-2"
          >
            Login
          </a>
        </div>

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div>

          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-grey-900 dark:text-gray-300"
          >
            I agree with the{' '}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
            .
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new account
        </button>
      </form>
    </div>
  );
}
