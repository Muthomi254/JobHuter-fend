
"use client";

import React, { useState } from 'react';
import {
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineEdit,
  AiOutlineClose,
} from 'react-icons/ai';
import EducationForm from './EducationForm';
import { useEducationContext } from '../../(context)/educationContext'; // Import the context

const Education = () => {
  const {
    educationEntries,
    addEducationEntry,
    updateEducationEntry,
    deleteEducationEntry,
  } = useEducationContext(); // Use the context

  const [showForm, setShowForm] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);

  const handleAddEducation = () => {
    setSelectedEducation(null);
    setShowForm(true);
  };

  const handleEditEducation = (education) => {
    setSelectedEducation(education);
    setShowForm(true);
  };

  const handleDeleteEducation = (id) => {
    deleteEducationEntry(id); // Call delete function from context
  };

  const handleSaveEducation = (formData) => {
    if (selectedEducation) {
      updateEducationEntry(selectedEducation.id, formData); // Call update function from context
    } else {
      addEducationEntry(formData); // Call add function from context
    }
    setShowForm(false);
  };

  return (
    <div className="max-w-md mx-auto pb-5 pt-5 ">
      <h2 className="text-xl font-medium text-gray-900 mb-5">Education</h2>
      {!showForm && (
        <button
          onClick={handleAddEducation}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <div className="flex items-center">
            <AiOutlinePlus className="h-5 w-5 mr-1" />
            Add Education
          </div>
        </button>
      )}

      {educationEntries.map((education) => (
        <div
          key={education.id}
          className="mb-8 border border-gray-200 p-6 rounded-lg shadow-md"
        >
         
          <div>
            <p className="font-semibold text-xl">{education.course_title}</p>
            <p className="text-gray-600">
              <span className="font-semibold">Institution: </span>
              {education.institution}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Location: </span>
              {education.city}, {education.country}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Start Date: </span>
              {new Date(education.start_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">End Date: </span>
              {new Date(education.end_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-sm text-gray-700 mt-4">
              <span className="font-semibold">Description: </span>
              {education.description}
            </p>
          </div>
          <div className="text-right">
            <button
              onClick={() => handleEditEducation(education)}
              className="text-blue-700 hover:text-green-600 focus:outline-none p-2 "
            >
              <AiOutlineEdit className="h-5 w-5 mr-1" /> Edit
            </button>
            <button
              onClick={() => handleDeleteEducation(education.id)}
              className="ml-2 text-red-500 hover:text-red-600 focus:outline-none"
            >
              <AiOutlineDelete className="h-5 w-5 mr-1" />
              Delete
            </button>
          </div>
        </div>
      ))}

      {showForm && (
        <div>
          <button
            className="text-red-500 hover:text-red-700 focus:outline-none"
            onClick={() => setShowForm(false)}
          >
            <div className="grid grid-cols-2">
              <AiOutlineClose className="h-5 w-5 mr-1" /> Close
            </div>
          </button>
          <EducationForm
            existingData={selectedEducation}
            onSave={handleSaveEducation}
          />
        </div>
      )}
    </div>
  );
};

export default Education;
