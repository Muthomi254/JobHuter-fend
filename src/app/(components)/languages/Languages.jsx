'use client';

//These are the imports

import React, { useState, useEffect } from 'react';
import {
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineEdit,
  AiFillCaretDown,
  AiFillCaretUp,
} from 'react-icons/ai';
import LanguageForm from './LanguageForm';
import { useLanguages } from '../../(context)/languagesContext';
import EditModal from '../ui-components/EditModal';
import Swal from 'sweetalert2';

const Language = () => {
  const { languages, deleteLanguage, fetchLanguages, fetchLanguageLevels } =
    useLanguages();

  const [showForm, setShowForm] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleAddLanguage = () => {
    setSelectedLanguage(null);
    setShowForm(true);
  };
   const handleEditLanguage = (language) => {
     setSelectedLanguage(language);
     setOpenEditModal(true);
   };



  const handleDeleteLanguage = (id) => {
    Swal.fire({
      title: 'Delete Language Entry?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteLanguage(id);
        Swal.fire(
          'Deleted!',
          'Your language entry has been deleted.',
          'success'
        );
        if (selectedLanguage && selectedLanguage.id === id) {
          setSelectedLanguage(null);
        }
      }
    });
  };

  const handleSaveLanguage = (formData) => {
    setShowForm(false);
  };

  const handleToggleDetails = (language) => {
    if (selectedLanguage && selectedLanguage.id === language.id) {
      setSelectedLanguage(null);
    } else {
      setSelectedLanguage(language);
    }
  };



  return (
    <div className="max-w-md mx-auto pb-5 pt-5">
      <h2 className="text-xl font-medium text-gray-900 mb-5">Languages</h2>
      {!showForm && (
        <button
          onClick={handleAddLanguage}
          className="text-blue-500 hover:text-blue-700 focus:outline-none mb-4"
        >
          <div className="flex items-center">
            <AiOutlinePlus className="h-5 w-5 mr-1" />
            Add Language
          </div>
        </button>
      )}

      <ul className="mt-4">
        {languages.map((language) => (
          <li key={language.id} className="mb-8">
            <div
              className="cursor-pointer flex justify-between items-center"
              onClick={() => handleToggleDetails(language)}
            >
              <p className="font-semibold text-blue-500 text-md">
                {language.language}
              </p>
              {selectedLanguage && selectedLanguage.id === language.id ? (
                <AiFillCaretUp className="h-5 w-5  text-red-500" />
              ) : (
                <AiFillCaretDown className="h-5 w-5  text-blue-500" />
              )}
            </div>
            {selectedLanguage && selectedLanguage.id === language.id && (
              <div className="border border-gray-200 p-6 rounded-lg shadow-md mt-4 ">
                <p className="text-gray-600">
                  <span className="font-semibold">Language:</span>{' '}
                  {language.language}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Language Level:</span>{' '}
                  {language.language_level}
                </p>
                <p className="text-sm text-gray-700 mt-4">
                  <span className="font-semibold">Additional Info:</span>{' '}
                  {language.additional_info}
                </p>
                <div className="text-right mt-4">
                  <button
                    onClick={() => handleEditLanguage(language)}
                    className="text-blue-700 hover:text-green-600 focus:outline-none mr-2"
                  >
                    <AiOutlineEdit className="h-5 w-5 mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteLanguage(language.id)}
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
          <LanguageForm
            language={selectedLanguage}
            onSave={handleSaveLanguage}
          />
        </div>
      )}

      <EditModal
        open={openEditModal}
        title="Edit Language"
        size="md"
        onClose={() => setOpenEditModal(false)}
      >
        {selectedLanguage && (
          <LanguageForm
            language={selectedLanguage}
            onSave={handleSaveLanguage}
          />
        )}
      </EditModal>
    </div>
  );
};

export default Language;
