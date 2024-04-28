"use client";

import React, { useState } from 'react';
import {
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineEdit,
  AiFillCaretDown,
  AiFillCaretUp,
} from 'react-icons/ai';
import ReferenceForm from './ReferencesForm'; // Assuming you have a ReferenceForm component
import { useReferenceContext } from '../../(context)/referenceContext'; // Update the import path
import EditModal from '../ui-components/EditModal';
import Swal from 'sweetalert2';

const Reference = () => {
  const { referenceEntries, deleteReferenceEntry } = useReferenceContext();

  const [showForm, setShowForm] = useState(false);
  const [selectedReference, setSelectedReference] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleAddReference = () => {
    setSelectedReference(null);
    setShowForm(true);
  };

  const handleEditReference = (reference) => {
    setSelectedReference(reference);
    setOpenEditModal(true);
  };

  const handleDeleteReference = (id) => {
    if (!selectedReference) {
      console.error('Selected reference is undefined');
      return;
    }

    Swal.fire({
      title: 'Delete Reference Entry?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReferenceEntry(id);
        Swal.fire(
          'Deleted!',
          'Your reference entry has been deleted.',
          'success'
        );
        if (selectedReference && selectedReference.id === id) {
          setSelectedReference(null);
        }
      }
    });
  };

  const handleSaveReference = (formData) => {
    // Without addReferenceEntry and updateReferenceEntry, this function becomes a placeholder
    console.log('Handle Save Reference:', formData);
    setShowForm(false);
  };

  const handleToggleDetails = (reference) => {
    if (selectedReference && selectedReference.id === reference.id) {
      setSelectedReference(null);
    } else {
      setSelectedReference(reference);
    }
  };

  return (
    <div className="max-w-md mx-auto pb-5 pt-5">
      <h2 className="text-xl font-medium text-gray-900 mb-5">References</h2>
      {!showForm && (
        <button
          onClick={handleAddReference}
          className="text-blue-500 hover:text-blue-700 focus:outline-none mb-4"
        >
          <div className="flex items-center">
            <AiOutlinePlus className="h-5 w-5 mr-1" />
            Add Reference
          </div>
        </button>
      )}

      <ul className="mt-4">
        {referenceEntries.map((reference) => (
          <li key={reference.id} className="mb-8">
            <div
              className="cursor-pointer flex justify-between items-center"
              onClick={() => handleToggleDetails(reference)}
            >
              <p className="font-semibold text-blue-500 text-md">
                {reference.name}
              </p>
              {selectedReference && selectedReference.id === reference.id ? (
                <AiFillCaretUp className="h-5 w-5 text-red-500" />
              ) : (
                <AiFillCaretDown className="h-5 w-5 text-blue-500" />
              )}
            </div>
            {selectedReference && selectedReference.id === reference.id && (
              <div className="border border-gray-200 p-6 rounded-lg shadow-md mt-4 ">
                <p className="text-gray-600">
                  <span className="font-semibold">Name:</span> {reference.name}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Job Title:</span>{' '}
                  {reference.job_title}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Organization:</span>{' '}
                  {reference.organization}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Email:</span>{' '}
                  {reference.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Phone:</span>{' '}
                  {reference.phone}
                </p>
                <div className="text-right mt-4">
                  <button
                    onClick={() => handleEditReference(reference)}
                    className="text-blue-700 hover:text-green-600 focus:outline-none mr-2"
                  >
                    <AiOutlineEdit className="h-5 w-5 mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteReference(reference.id)}
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
          <ReferenceForm
            existingData={selectedReference}
            onSave={handleSaveReference}
          />
        </div>
      )}

      <EditModal
        open={openEditModal}
        title="Edit Reference"
        size="md"
        onClose={() => setOpenEditModal(false)}
      >
        {selectedReference && (
          <ReferenceForm
            existingData={selectedReference}
            onSave={handleSaveReference}
          />
        )}
      </EditModal>
    </div>
  );
};

export default Reference;
