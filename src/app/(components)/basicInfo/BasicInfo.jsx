"use client";

import { useState } from 'react';
import BasicInfoForm from './BasicInfoForm';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';

const BasicInfoContainer = ({ recordedData }) => {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="max-w-md mx-auto pb-10 pt-5">
      <h2 className="text-xl font-medium text-gray-900 mb-5">
        Personal Information
      </h2>
      {!recordedData && !showForm && (
        <button
          onClick={handleToggleForm}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <div className="flex items-center">
            <AiOutlinePlus className="h-5 w-5 mr-1" />
            Add Personal Info
          </div>
        </button>
      )}
      {showForm && (
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
          <BasicInfoForm initialData={recordedData} />
        </div>
      )}
    </div>
  );
};

export default BasicInfoContainer;
