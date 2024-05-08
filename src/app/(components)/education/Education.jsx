
"use client";

import React, { useState, useEffect } from 'react';
import {
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineEdit,
  AiFillCaretDown,
  AiFillCaretUp,
} from 'react-icons/ai';
import EducationForm from './EducationForm';
import { useEducationContext } from '../../(context)/educationContext';
import EditModal from '../ui-components/EditModal';
import Swal from 'sweetalert2';
import { Button } from 'flowbite-react';


const Education = () => {
  const { educationEntries, deleteEducationEntry, fetchEducationEntries } =
    useEducationContext();

  const [showForm, setShowForm] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleAddEducation = () => {
    setSelectedEducation(null);
    setShowForm(true);
  };

  const handleEditEducation = (education) => {
    setSelectedEducation(education);
    setOpenEditModal(true);
  };

  useEffect(() => {
    fetchEducationEntries();
  }, []); // Fetch entries on component mount
  const handleDeleteEducation = (id) => {
    Swal.fire({
      title: 'Delete Education Entry?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEducationEntry(id);
        Swal.fire(
          'Deleted!',
          'Your education entry has been deleted.',
          'success'
        );
        if (selectedEducation && selectedEducation.id === id) {
          setSelectedEducation(null);
        }
      }
    });
  };

  const handleSaveEducation = (formData) => {
    // Without addEducationEntry and updateEducationEntry, this function becomes a placeholder
    console.log('Handle Save Education:', formData);
    setShowForm(false);
  };
  const handleToggleDetails = (education) => {
    if (selectedEducation && selectedEducation.id === education.id) {
      setSelectedEducation(null);
    } else {
      setSelectedEducation(education);
    }
  };

  return (
    <div className="max-w-md mx-auto pb-5 pt-5">
      <h2 className="text-xl font-medium text-gray-900 mb-5">Education</h2>
      {!showForm && (
        <button
          onClick={handleAddEducation}
          className="text-blue-500 hover:text-blue-700 focus:outline-none mb-4"
        >
          <div className="flex items-center">
            <AiOutlinePlus className="h-5 w-5 mr-1" />
            Add Education
          </div>
        </button>
      )}

      <ul className="mt-4">
        {educationEntries.map((education) => (
          <li key={education.id} className="mb-8">
            <div
              className="cursor-pointer flex justify-between items-center"
              onClick={() => handleToggleDetails(education)}
            >
              <p className="font-semibold text-blue-500 text-md">
                {education.course_title}
              </p>
              {selectedEducation && selectedEducation.id === education.id ? (
                <AiFillCaretUp className="h-5 w-5 text-red-500" />
              ) : (
                <AiFillCaretDown className="h-5 w-5 text-blue-500" />
              )}
            </div>
            {selectedEducation && selectedEducation.id === education.id && (
              <div className="border border-gray-200 p-6 rounded-lg shadow-md mt-4 ">
                <p className="text-gray-600">
                  <span className="font-semibold">Course:</span>{' '}
                  {education.course_title}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Institution:</span>{' '}
                  {education.institution}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Location:</span>{' '}
                  {education.city}, {education.country}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Start Date:</span>{' '}
                  {new Date(education.start_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">End Date:</span>{' '}
                  {new Date(education.end_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-sm text-gray-700 mt-4">
                  <span className="font-semibold">Description:</span>{' '}
                  {education.description}
                </p>
                <div className="text-right mt-4">
                  <button
                    onClick={() => handleEditEducation(education)}
                    className="text-blue-700 hover:text-green-600 focus:outline-none mr-2"
                  >
                    <AiOutlineEdit className="h-5 w-5 mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEducation(education.id)}
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
          <EducationForm
            existingData={selectedEducation}
            onSave={handleSaveEducation}
          />
        </div>
      )}

      <EditModal
        open={openEditModal}
        title="Edit Education"
        size="md"
        onClose={() => setOpenEditModal(false)}
      >
        {selectedEducation && (
          <EducationForm
            existingData={selectedEducation}
            onSave={handleSaveEducation}
          />
        )}
      </EditModal>
    </div>
  );
};

export default Education;
