'use client';

import React, { useState,  useEffect } from 'react';
import {
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineEdit,
  AiFillCaretDown,
  AiFillCaretUp,
} from 'react-icons/ai';
import ExperienceForm from './ExperienceForm'; // Make sure to import the correct form component
import { useExperience } from '../../(context)/experienceContext'; // Update the import path
import EditModal from '../ui-components/EditModal';
import Swal from 'sweetalert2';

const Experience = () => {
  const {
    experiences,
    fetchExperiences,
    deleteExperienceEntry,
  } = useExperience(); // Update the hook to useExperience

  const [showForm, setShowForm] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleAddExperience = () => {
    setSelectedExperience(null);
    setShowForm(true);
  };

  const handleEditExperience = (experience) => {
    setSelectedExperience(experience);
    setOpenEditModal(true);
  };


  const handleDeleteExperience = (id) => {
    Swal.fire({
      title: 'Delete Experience Entry?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteExperienceEntry(id);
        Swal.fire(
          'Deleted!',
          'Your experience entry has been deleted.',
          'success'
        );
        if (selectedExperience && selectedExperience.id === id) {
          setSelectedExperience(null);
        }
      }
    });
  };

  const handleSaveExperience = (formData) => {
    // Placeholder function without context actions
    console.log('Handle Save Experience:', formData);
    setShowForm(false); // Close the form

    // Show success message using SweetAlert
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Experience entry saved successfully!',
    });
  };


  

  const handleToggleDetails = (experience) => {
    if (selectedExperience && selectedExperience.id === experience.id) {
      setSelectedExperience(null);
    } else {
      setSelectedExperience(experience);
    }
  };

  return (
    <div className="max-w-md mx-auto pb-5 pt-5">
      <h2 className="text-xl font-medium text-gray-900 mb-5">Experience</h2>
      {!showForm && (
        <button
          onClick={handleAddExperience}
          className="text-blue-500 hover:text-blue-700 focus:outline-none mb-4"
        >
          <div className="flex items-center">
            <AiOutlinePlus className="h-5 w-5 mr-1" />
            Add Experience
          </div>
        </button>
      )}

      <ul className="mt-4">
        {experiences.map((experience) => (
          <li key={experience.id} className="mb-8">
            <div
              className="cursor-pointer flex justify-between items-center"
              onClick={() => handleToggleDetails(experience)}
            >
              <p className="font-semibold text-blue-500 text-md">
                {experience.employer}
              </p>
              {selectedExperience && selectedExperience.id === experience.id ? (
                <AiFillCaretUp className="h-5 w-5 text-red-500" />
              ) : (
                <AiFillCaretDown className="h-5 w-5 text-blue-500" />
              )}
            </div>
            {selectedExperience && selectedExperience.id === experience.id && (
              <div className="border border-gray-200 p-6 rounded-lg shadow-md mt-4 ">
                <p className="text-gray-600">
                  <span className="font-semibold">Job Title:</span>{' '}
                  {experience.job_title}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Employer:</span>{' '}
                  {experience.employer}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Location:</span>{' '}
                  {experience.city}, {experience.country}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Start Date:</span>{' '}
                  {new Date(experience.start_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">End Date:</span>{' '}
                  {new Date(experience.end_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-sm text-gray-700 mt-4">
                  <span className="font-semibold">Description:</span>{' '}
                  {experience.description}
                </p>
                <div className="text-right mt-4">
                  <button
                    onClick={() => handleEditExperience(experience)}
                    className="text-blue-700 hover:text-green-600 focus:outline-none mr-2"
                  >
                    <AiOutlineEdit className="h-5 w-5 mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteExperience(experience.id)}
                    className="text-red-600 hover:text-red-400 focus:outline-none"
                  >
                    <AiOutlineDelete className="h-5 w-5 mr-1" /> Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

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
            existingData={selectedExperience}
            onSave={handleSaveExperience}
          />
        </div>
      )}

      <EditModal
        open={openEditModal}
        title="Edit Experience"
        size="md"
        onClose={() => setOpenEditModal(false)}
      >
        {selectedExperience && (
          <ExperienceForm
            existingData={selectedExperience}
            onSave={handleSaveExperience}
          />
        )}
      </EditModal>
    </div>
  );
};

export default Experience;
