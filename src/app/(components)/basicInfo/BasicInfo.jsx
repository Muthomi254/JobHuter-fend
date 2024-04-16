"use client";

import { useState, useEffect } from 'react';
import BasicInfoForm from './BasicInfoForm';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { useBasicInfo } from '../../(context)/basicInfoContext'; // Import useBasicInfo hook

const BasicInfoContainer = () => {
  const [showForm, setShowForm] = useState(false);
  const { basicInfo, fetchBasicInfo } = useBasicInfo(); // Access basicInfo state and fetchBasicInfo function

  // Fetch basic info when component mounts
  useEffect(() => {
    fetchBasicInfo();
  }, []); // Empty dependency array to trigger fetch only once on mount

  const handleToggleForm = (event) => {
    event.preventDefault(); // Prevent default behavior of the event
    setShowForm(!showForm);
  };

  return (
    <div className="max-w-md mx-auto pb-5 pt-5">
      <h2 className="text-xl font-medium text-gray-900 mb-5">
        Personal Information
      </h2>
      {basicInfo ? (
        // Render basic info if available
        <div className="bg-white shadow-md rounded-lg p-6">
          {basicInfo.image_data && ( // Check if image data exists
            <div className="mb-6 flex justify-center">
              <img
                src={`data:image/png;base64,${basicInfo.image_data}`}
                alt="User"
                className="w-32 h-32 rounded-full"
              />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <div className="mb-6">
              <p className="text-lg font-semibold mb-2">Name:</p>
              <p className="text-gray-800">
                {basicInfo.first_name} {basicInfo.last_name}
              </p>
            </div>
            <div className="mb-6">
              <p className="text-lg font-semibold mb-2">Job Title:</p>
              <p className="text-gray-800">{basicInfo.job_title}</p>
            </div>
            <div className="mb-6">
              <p className="text-lg font-semibold mb-2">Date of Birth:</p>
              <p className="text-gray-800">{basicInfo.date_of_birth}</p>
            </div>
            <div className="mb-6">
              <p className="text-lg font-semibold mb-2">Nationality:</p>
              <p className="text-gray-800">{basicInfo.nationality}</p>
            </div>
            <div className="mb-6">
              <p className="text-lg font-semibold mb-2">Passport ID:</p>
              <p className="text-gray-800">{basicInfo.passport_id}</p>
            </div>
            <div className="mb-6">
              <p className="text-lg font-semibold mb-2">Gender:</p>
              <p className="text-gray-800">{basicInfo.gender}</p>
            </div>
          </div>
        </div>
        
      ) : !showForm ? (
        <button
          onClick={handleToggleForm}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <div className="flex items-center">
            <AiOutlinePlus className="h-5 w-5 mr-1" />
            Add Personal Info
          </div>
        </button>
      ) : (
        <div>
          <button
            onClick={handleToggleForm}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            <div className="flex items-center">
              <AiOutlineClose className="h-5 w-5 mr-1" />
              Close
            </div>
          </button>
          <BasicInfoForm />
        </div>
      )}
    </div>
  );
};

export default BasicInfoContainer;
