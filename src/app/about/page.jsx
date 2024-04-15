import React from 'react';
import Head from 'next/head';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { FaRegLightbulb, FaComments } from 'react-icons/fa';
import { RiTeamLine } from 'react-icons/ri';
import { IoMdGlobe } from 'react-icons/io';
import Link from 'next/link';

export default function About() {
  return (
    <div>
      <Head>
        <title>About Us - Your App Name</title>
        <meta
          name="description"
          content="Learn more about Your App Name - the ultimate destination for creating professional resumes."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>
      <div className="container mx-auto px-4 py-8">
        <p className="text-lg text-gray-700 mb-6">
          Welcome to Your App Name, your ultimate destination for creating
          professional and eye-catching resumes effortlessly. Our platform is
          designed to simplify the resume-building process, helping you craft a
          standout CV that reflects your skills, experiences, and personality.
        </p>

        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-6">
          At Your App Name, our mission is to empower individuals to present
          themselves effectively in the competitive job market. We understand
          the challenges job seekers face when creating resumes, so we've
          developed a user-friendly platform with a wide range of features to
          make the process seamless and enjoyable.
        </p>

        <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
        <ul className="list-disc list-inside mb-6">
          <li className="text-lg text-gray-700 mb-2">
            Intuitive Interface: Our platform features an intuitive and
            user-friendly interface, making it easy for users of all levels to
            navigate and create stunning resumes.
          </li>
          <li className="text-lg text-gray-700 mb-2">
            Customization Options: Personalization is key when it comes to
            resumes. We offer a variety of customization options, allowing users
            to tailor their resumes to their specific needs and preferences.
          </li>
          <li className="text-lg text-gray-700 mb-2">
            Professional Templates: Choose from a selection of professionally
            designed templates crafted by experts in resume design.
          </li>
          <li className="text-lg text-gray-700 mb-2">
            Dynamic Sections: Easily add and arrange different sections such as
            education, work experience, skills, and more.
          </li>
          <li className="text-lg text-gray-700 mb-2">
            Collaboration Tools: Collaborate with colleagues, mentors, or
            friends to get feedback and suggestions on your resume.
          </li>
          <li className="text-lg text-gray-700 mb-2">
            Mobile Compatibility: Access your resume anytime, anywhere with our
            mobile-compatible platform.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">Get Started Today!</h2>
        <p className="text-lg text-gray-700 mb-6">
          Ready to create a standout resume that impresses recruiters and hiring
          managers? Sign up for free and start building your resume on Your App
          Name today!
        </p>
        <p className="text-lg text-gray-700 mb-6">
          If you have any questions or need assistance, feel free to reach out
          to our customer support team. We're here to help you succeed in your
          job search journey.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for choosing Your App Name!
        </p>
      </div>
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
            <p className="text-lg text-gray-600 mb-8">
              We are a passionate team dedicated to providing innovative
              solutions and exceptional service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full text-white mb-4">
                <HiOutlineUserGroup className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Our Mission
              </h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                feugiat interdum lorem ut scelerisque.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full text-white mb-4">
                <FaRegLightbulb className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Our Vision
              </h3>
              <p className="text-gray-600">
                Sed feugiat interdum lorem ut scelerisque. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full text-white mb-4">
                <FaComments className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Our Values
              </h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                feugiat interdum lorem ut scelerisque.
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Meet the Team
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              feugiat interdum lorem ut scelerisque.
            </p>
            <Link
              to="/team"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300"
            >
              View Team
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-center w-16 h-16 bg-indigo-500 rounded-full text-white mb-4">
                <RiTeamLine className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Team Members
              </h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                feugiat interdum lorem ut scelerisque.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500 rounded-full text-white mb-4">
                <IoMdGlobe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Global Presence
              </h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                feugiat interdum lorem ut scelerisque.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
