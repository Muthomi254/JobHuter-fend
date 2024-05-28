// ProfilePage.js
'use client';
import React, { useState, useEffect } from 'react';
import { useProfileContext } from '../../(context)/profileContext';
import {
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineEdit,
  AiOutlineDelete,
} from 'react-icons/ai';
import { Button } from 'flowbite-react'; // Import Button component
import EditModal from '../ui-components/EditModal';
import DescriptionForm from './DescriptionForm';
import Swal from 'sweetalert2'; // Import SweetAlert


const ProfileContainer = () => {
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  const {
    profiles,
    fetchProfiles,
    
    deleteProfile,
  } = useProfileContext();

  const handleOpenModal = (profileId) => {
    setSelectedProfileId(profileId);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };


  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

const handleDeleteProfile = async (profileId) => {
  try {
    const result = await Swal.fire({
      title: 'Delete Profile?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      await deleteProfile(profileId);
      // Refresh profiles after deletion
      fetchProfiles();
      // Show success notification for deletion
      Swal.fire('Deleted!', 'Your profile has been deleted.', 'success');
    }
  } catch (error) {
    console.error('Error deleting profile:', error.message);
    // Show error notification
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'An error occurred while deleting the profile. Please try again later.',
    });
  }
};


  return (
    <div className="max-w-md mx-auto pb-5 pt-5 cursor-pointer">
      <h2 className="text-xl font-medium text-gray-900 mb-5">
        Profile Information
      </h2>

      {profiles ? (
        <div className="bg-white shadow-md rounded-lg ">
          {profiles.map((profile) => (
            <div key={profile.id}>
              <div className="mb-6">
                <p className="text-lg font-semibold mb-2">Description:</p>
                <p className="text-gray-800">{profile.description}</p>
              </div>
              <div className="flex">
                <Button
                  onClick={() => handleOpenModal(profile.id)}
                  color="light"
                  className="bg-transparent text-blue-700 font-semibold py-2 px-4 mr-2"
                >
                  <AiOutlineEdit className="h-5 w-5 mr-1" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteProfile(profile.id)}
                  color="light"
                  className="bg-transparent text-red-700 font-semibold py-2 px-4"
                >
                  <AiOutlineDelete className="h-5 w-5 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {!profiles.some((profile) => profile.description) && (
        <button
          onClick={handleToggleForm}
          color="light"
          className={`py-2 px-4 rounded ${
            showForm ? 'text-red-500 ' : 'text-blue-500'
          }`}
        >
          {showForm ? (
            <>
              <AiOutlineClose className="h-5 w-5 mr-1" />
              Close
            </>
          ) : (
            <>
              <AiOutlinePlus className="h-5 w-5 mr-1" />
              Add Profile
            </>
          )}
        </button>
      )}
      {showForm && (
        <div>
          <DescriptionForm onSave={() => setShowForm(false)} />
        </div>
      )}

      

      <EditModal
        open={open}
        title="Edit Profile"
        size="md"
        className="bg-transparent"
        onClose={handleCloseModal}
      >
        <DescriptionForm
          existingData={profiles.find(
            (profile) => profile.id === selectedProfileId
          )}
          onSave={() => setShowForm(false)}
        />
      </EditModal>
    </div>
  );
};

export default ProfileContainer;
