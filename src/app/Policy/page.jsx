"use client"; 
import Head from 'next/head';

export default function Terms() {
  return (
        <div className="bg-gray-100 min-h-screen pt-20">

    <div className="container mt-20  mx-auto px-8 py-8">
      <div>
        <title>Terms and Policies - CV App</title>
        <meta name="description" content="Terms and policies for the CV App" />
        <link rel="icon" href="/favicon.ico" />
      </div>

      <main>
        <h1 className="text-3xl font-bold mb-4">Terms and Policies</h1>
        <p className="text-lg text-gray-700 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis
          nunc eu enim feugiat maximus. Nulla facilisi. Integer sollicitudin
          lacus id urna rhoncus lacinia. Duis posuere mauris nec ligula
          scelerisque placerat. Sed nec enim eu velit pharetra lobortis.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Donec et neque malesuada, vehicula enim ac, aliquam risus. Duis
          interdum vehicula sodales. Vestibulum ultricies lectus velit, in
          fringilla nibh mollis sed. In id purus ipsum. Aenean hendrerit, felis
          in dictum fermentum, mauris neque tincidunt orci, non egestas leo
          lorem vitae sapien.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Vivamus et quam a ligula euismod egestas a eu felis. Integer sodales
          dolor in tellus lacinia mollis. Aenean eleifend justo vitae purus
          faucibus, ac elementum ex sagittis. Sed at nunc suscipit, gravida sem
          vel, fermentum dui.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          If you have any questions about our terms and policies, please{' '}
          <a href="#" className="text-blue-600 hover:underline">
            contact us
          </a>
          .
        </p>
      </main>

     
    </div>
    </div>
  );
}
