import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { FaRegLightbulb } from 'react-icons/fa';
import { IoMdGlobe } from 'react-icons/io';
import { AiOutlinePhone } from 'react-icons/ai'; // Phone/Mobile Device icon
import { FaSlidersH } from 'react-icons/fa'; // Customization Options icons
import { IoIosPaper } from 'react-icons/io'; // Professional Templates icons
import { RiUserFollowLine, BsPeople } from 'react-icons/ri'; // Collaboration Tools icons



export default function About() {
  return (
    <div>
      <Head>
        <title>About Us - Job Hunter</title>
        <meta
          name="description"
          content="Learn more about Job Hunter - the ultimate destination for creating professional resumes."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center pt-10">About Us</h1>

        <p className="text-lg text-gray-700 mb-6">
          Welcome to Job Hunter, your ultimate destination for creating
          professional and eye-catching resumes effortlessly. Our platform is
          designed to simplify the resume-building process, helping you craft a
          standout CV that reflects your skills, experiences, and personality.
        </p>

        {/* Our Mission */}
        <div className="mb-12 pt-4">
          <h2 className="flex items-center text-2xl font-bold mb-4">
            <HiOutlineUserGroup className="mr-2 text-blue-500" />
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            At Job Hunter, our mission is to empower individuals to present
            themselves effectively in the competitive job market. We understand
            the challenges job seekers face when creating resumes, so we&apos;ve
            developed a user-friendly platform with a wide range of features to
            make the process seamless and enjoyable.
          </p>
        </div>

        {/* What We Offer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            icon={<FaRegLightbulb className="w-8 h-8" />}
            title="Intuitive Interface"
            description="Our platform features an intuitive and user-friendly interface, making it easy for users of all levels to navigate and create stunning resumes."
          />
          <FeatureCard
            icon={<FaSlidersH className="w-8 h-8" />}
            title="Customization Options"
            description="Personalization is key when it comes to resumes. We offer a variety of customization options, allowing users to tailor their resumes to their specific needs and preferences."
          />
          <FeatureCard
            icon={<IoIosPaper className="w-8 h-8" />}
            title="Professional Templates"
            description="Choose from a selection of professionally designed templates crafted by experts in resume design."
          />
          <FeatureCard
            icon={<IoMdGlobe className="w-8 h-8" />}
            title="Dynamic Sections"
            description="Easily add and arrange different sections such as education, work experience, skills, and more."
          />
          <FeatureCard
            icon={<RiUserFollowLine className="w-8 h-8" />}
            title="Collaboration Tools"
            description="Collaborate with colleagues, mentors, or friends to get feedback and suggestions on your resume."
          />
          <FeatureCard
            icon={<AiOutlinePhone className="w-8 h-8" />}
            title="Mobile Compatibility"
            description="Access your resume anytime, anywhere with our mobile-compatible platform."
          />
        </div>

        {/* Get Started Today */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Get Started Today!</h2>
          <p className="text-lg text-gray-700 mb-6">
            Ready to create a standout resume that impresses recruiters and
            hiring managers? Sign up for free and start building your resume on
            Job Hunter today!
          </p>
          <p className="text-lg text-gray-700 mb-6">
            If you have any questions or need assistance, feel free to reach out
            to our customer support team. We&apos;re here to help you succeed in
            your job search journey.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Thank you for choosing Job Hunter!
          </p>
          <Link href="/register">
            <button className="bg-blue-700 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// FeatureCard component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full text-white mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);
