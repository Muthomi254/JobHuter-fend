'use client';

import React, { useState } from 'react';
import { useAuth } from '../../(context)/authContext'; // Import the useAuth hook

export default function Page() {
  const { login } = useAuth(); // Destructure the login function from the useAuth hook

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new FormData object from the form
    const formData = new FormData(event.target);

    // Get the email and password from formData
    const email = formData.get('email');
    const password = formData.get('password');

    // Call login function with form data
    await login({ email, password });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="max-w-md w-full px-4" onSubmit={handleSubmit}>
        <div class="mb-5">
          <label
            for="email"
            class="block mb-2 text-sm font-medium  text-gray-900 dark:text-gray-500"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@example.com"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <div class="flex items-center mb-5 text-sm font-small text-gray-500">
          New here?
          <a
            href="/register"
            class="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-600 font-small text-xs  hover:underline ml-2 "
          >
            Register
          </a>
        </div>
        <div class="flex items-center mb-5">
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
          <div class="ml-20">
            <a
              href="/forgotPassword"
              class="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-600 font-small text-xs hover:underline ml-20 "
            >
              Forgot Password?
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
