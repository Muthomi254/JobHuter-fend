"use client"

import React, { useState } from 'react';
import ExperienceForm from './ExperienceForm';
import {
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineEdit,
  AiOutlineClose,
} from 'react-icons/ai';

function ProfessionalExperience() {
  const [experiences, setExperiences] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const handleAddExperience = () => {
    setSelectedExperience(null);
    setShowForm(true);
  };

  const handleEditExperience = (experience) => {
    setSelectedExperience(experience);
    setShowForm(true);
  };

  const handleDeleteExperience = (id) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const handleSaveExperience = (experience) => {
    if (selectedExperience) {
      const updatedExperiences = experiences.map((exp) =>
        exp.id === selectedExperience.id ? experience : exp
      );
      setExperiences(updatedExperiences);
    } else {
      setExperiences([...experiences, experience]);
    }
    setShowForm(false);
  };

  return (
    <div className="max-w-md mx-auto pb-10 pt-5 ">
      <h2 className="text-xl font-medium text-gray-900 mb-5">
        Professional Experience
      </h2>

      {!showForm && (
        <button
          onClick={handleAddExperience}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <div className="flex items-center">
            <AiOutlinePlus className="h-5 w-5 mr-1" />
            Add Experience{' '}
          </div>
        </button>
      )}

      {experiences.map((experience) => (
        <div key={experience.id} className="mb-4">
          <p>{experience.employer}</p>
          <p>{experience.job_title}</p>
          {/* Add other experience details here */}
          <div>
            <button onClick={() => handleEditExperience(experience)}>
              <AiOutlineEdit /> Edit
            </button>
            <button onClick={() => handleDeleteExperience(experience.id)}>
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
          <ExperienceForm
            experience={selectedExperience}
            onSave={handleSaveExperience}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
    </div>
  );
}

export default ProfessionalExperience;