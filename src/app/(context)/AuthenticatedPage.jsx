'use client';


 import React from 'react';
 import { useAuth } from '../(context)/authContext'; // Import useAuth hook
 import Link from 'next/link'; // Import Link from Next.js
 import { AuthContext } from '../(context)/authContext';

 function AuthenticatedPage({ children }) {
  //  const { user } = useAuth(); // Destructure user from useAuth

  const { user } = React.useContext(AuthContext)
  console.log('User on render', user)

   console.log( "Hello world", user);
   // If user is not logged in, redirect to login page or show a message
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
