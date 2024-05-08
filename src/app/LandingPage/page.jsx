"use client" ; 

import React from 'react';
import Link from 'next/link';
import { Card } from 'flowbite-react';
import Image from 'next/image';

function Body() {
  return (
    <div className=" min-h-screen pt-10">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center p-8 md:text-left">
            <h2 className="text-3xl font-bold mb-4">Create Your Perfect CV</h2>
            <p className="text-lg text-gray-700 mb-6">
              Build a professional CV effortlessly with our user-friendly app.
            </p>
            <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
              <Link href="/register">Get Started</Link>
            </button>
            <Link
              href="/login"
              className="text-blue-600 hover:underline mt-2 block"
            >
              Already have an account? Login
            </Link>
          </div>
          <Image src={'/cvimage 9.jpg'} alt="CV App" width={700} height={100} />
        </div>
      </div>
      <div className="bg-white py-12 pt-12  min-h-screen">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Why Choose Our CV App?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Card className="max-w-sm">
                <div className="relative w-full md:w-auto">
                  <div className="aspect-w-16 aspect-h-9">
                    <Image
                      src="/cvImage11.jpg"
                      alt="Feature 1"
                      width={500}
                      height={500}
                      className="object-cover object-center"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
                <p className="text-gray-700">
                  Our app is intuitive and simple to use, making it easy for
                  anyone to create their CV.
                </p>
              </Card>
            </div>
            <div className="text-center">
              <Card className="max-w-sm">
                <div className="relative w-full md:w-auto">
                  <div className="aspect-w-16 aspect-h-9">
                    <Image
                      src="/cvImage10.jpg"
                      alt="Feature 2"
                      width={500}
                      height={500}
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Customizable Templates
                </h3>
                <p className="text-gray-700">
                  Choose from a variety of professionally designed templates to
                  suit your style and industry.
                </p>
              </Card>
            </div>
            <div className="text-center">
              <Card className="max-w-sm">
                <div className="relative w-full md:w-auto">
                  <div className="aspect-w-16 aspect-h-9">
                    <Image
                      src="/cvimages.jpeg"
                      alt="Job Hunter"
                      width={500}
                      height={500}
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Mobile-Friendly</h3>
                <p className="text-gray-700">
                  Access your CV anytime, anywhere. Our app is fully responsive
                  and optimized for mobile devices.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              "I was able to create a stunning CV in minutes. Highly
              recommended!"
            </p>
            <p className="text-gray-500">- John Doe</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              "The templates are beautiful and professional. It helped me stand
              out from other applicants."
            </p>
            <p className="text-gray-500">- Jane Smith</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              "Great app! I got hired shortly after using it."
            </p>
            <p className="text-gray-500">- Michael Johnson</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
