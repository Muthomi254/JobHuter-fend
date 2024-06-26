'use client';

import React, { useState, useContext } from 'react';
import { AuthContext } from '../../(context)/authContext';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js for navigation
import Spinner from '@/app/(components)/ui-components/Spinner';

export default function Page() {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    

 const isSecurePassword = (password) => {
   const hasUppercase = /[A-Z]/.test(password);
   const hasLowercase = /[a-z]/.test(password);
   const hasNumber = /\d/.test(password);
   const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
   const isLongEnough = password.length >= 8;

   return (
     hasUppercase && hasLowercase && hasNumber && hasSpecialChar && isLongEnough
   );
 };
 const togglePasswordVisibility = () => {
   setShowPassword(!showPassword); // Toggle password visibility
 };


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Extract email and password from form fields
    const email = document.getElementById('floating_email').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;

    // Validate password confirmation
    if (password !== confirm_password) {
      setError('Password confirmation does not match');
      setLoading(false);

      return;
    }

    // Validate password strength
    if (!isSecurePassword(password)) {
      setError(
        'Password must contain at least 8 characters including uppercase, lowercase, number, and special character.'
      );
      setLoading(false);

      return;
    }

    try {
      // Attempt to register user using AuthContext
      await authContext.register({ email, password, confirm_password });
      // If registration succeeds, show success message and redirect to login page
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have successfully registered!',
      }).then(() => {
        router.push('/login'); // Use useRouter to navigate to login page
      });
    } catch (error) {
      // Handle registration error
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'An error occurred while registering. Please try again later.',
      });
      setError('Registration failed user email already exists');
    } finally {
      setLoading(false);
    }
  };

 const handleNavigation = (path) => {
   setLoading(true);
   router.push(path);
 };


  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Spinner />}

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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              required
            />
            {/* Button to toggle password visibility */}
            <button
              type="button"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={togglePasswordVisibility} // Toggle password visibility on button click
            >
              <div className='text-sm'> {showPassword ? 'Hide' : 'Show'}</div>
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex items-start mb-5 text-sm font-small text-grey-900">
          Already have an account?
          <a
            href="/login"
            onClick={() => {
              handleNavigation('/login');
            }}
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
