'use client';

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../(context)/authContext'; // Import AuthContext to access user state
import Link from 'next/link'; // Import Link from Next.js
import Spinner from '@/app/(components)/ui-components/Spinner';

function AuthenticatedPage({ children }) {
  const { user, logout } = useContext(AuthContext); // Destructure user and logout from AuthContext
  const [loading, setLoading] = useState(true); // Add loading state

  const handleLogout = () => {
    // Define your logout logic here
    logout(); // Call the logout function provided by the context
  };

  useEffect(() => {
    if (user) {
      const loginTime = localStorage.getItem('loginTime');
      if (loginTime) {
        const twelveHours = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - parseInt(loginTime);

        // Check if elapsed time exceeds 12 hours, then logout
        if (elapsedTime > twelveHours) {
          logout();
        }
      }
    }
    // Simulate an API call to verify authentication
    setTimeout(() => {
      setLoading(false); // Set loading to false after data is loaded
    }, 1000); // Adjust the timeout duration as needed
  }, [user, handleLogout]); // Run the effect whenever user state changes

  // Show the loading spinner while verifying authentication
  if (loading) {
    return (
        <Spinner />
    );
  }

  // If user is not logged in, show the login page or a message
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="py-5 px-5 text-center">
          <div className="mb-6 text-xl font-bold">
            You need to be logged in to access this page.
          </div>
          <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 mb-4">
            <Link href="/register">Get Started</Link>
          </button>
          <div className="text-sm text-gray-600">
            <Link href="/login" className="text-blue-600 hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If user is logged in, render the children components
  return <>{children}</>;
}

export default AuthenticatedPage;
