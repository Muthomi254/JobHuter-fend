
"use client";

import React, { useState } from 'react';
import {
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineEdit,
  AiOutlineClose,
} from 'react-icons/ai';
import EducationForm from './EducationForm';

const Education = () => {
  const [educations, setEducations] = useState([]);
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
    setEducations(educations.filter((edu) => edu.id !== id));
  };

  const handleSaveEducation = (education) => {
    if (selectedEducation) {
      const updatedEducations = educations.map((edu) =>
        edu.id === selectedEducation.id ? education : edu
      );
      setEducations(updatedEducations);
    } else {
      setEducations([...educations, education]);
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

      {educations.map((education) => (
        <div key={education.id} className="mb-4">
          <p>{education.course_title}</p>
          <p>{education.institution}</p>
          {/* Add other education details here */}
          <div>
            <button onClick={() => handleEditEducation(education)}>
              <AiOutlineEdit /> Edit
            </button>
            <button onClick={() => handleDeleteEducation(education.id)}>
              <AiOutlineDelete /> Delete
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
            education={selectedEducation}
            onSave={handleSaveEducation}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Education;