
"use client"

import React, { useState, useContext } from 'react';
import { AuthContext } from '../../(context)/authContext';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'; // Correct import for useRouter from Next.js

export default function Page() {
  const authContext = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    new_password: '',
    confirm_password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // Initialize useRouter hook

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword); // Toggle password visibility
    };

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { new_password, confirm_password } = formData;
    if (new_password !== confirm_password) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
      });
      return;
    }
    if (!isSecurePassword(new_password)) {
      Swal.fire({
        icon: 'error',
        title:
          'Password does not meet security requirements Password must contain at least 8 characters including uppercase, lowercase, number, and special character',
      });
      return;
    }
    try {
      await authContext.forgotPassword(formData); // Call forgotPassword function from AuthContext
      Swal.fire({
        icon: 'success',
        title: 'Password reset successful!',
      }).then(() => {
        router.push('/login'); // Use useRouter to navigate to login page
      });
    } catch (error) {
      console.error('Forgot password error:', error); // Handle forgot password error
      Swal.fire({
        icon: 'error',
        title: 'Password reset failed',
        text: error.message,
      });
    }
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <form className="max-w-md w-full px-4" onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type={showPassword ? 'text' : 'password'} // Show plain text if showPassword is true
            name="new_password"
            value={formData.new_password}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <button
            type="button"
            className="absolute right-0 top-3 mr-3 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-500"
            onClick={togglePasswordVisibility} // Toggle password visibility on button click
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter New Password
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
        </div>
        <div className="flex items-center mb-5 text-sm font-small text-gray-500 ">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Reset Password
          </button>
          <div className="flex items-center">
            <a
              href="/login"
              className="text-gray-600 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-600 font-medium text-md hover:underline ml-20"
            >
              BACK TO LOGIN
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
