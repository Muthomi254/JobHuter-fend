'use client';

// DescriptionForm.js
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useProfileContext } from '../../(context)/profileContext';
import Swal from 'sweetalert2'; // Import SweetAlert

function DescriptionForm({ existingData, onSave }) {
  const { register, handleSubmit, reset } = useForm();
  const { createProfile, updateProfile } = useProfileContext();

  useEffect(() => {
    if (existingData) {
      reset(existingData);
    } else {
      reset({});
    }
  }, [existingData, reset]);

  const onSubmit = async (formData) => {
    try {
      if (existingData) {
        await updateProfile(existingData.id, formData);
        // Show success notification for update
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          text: 'Your profile has been updated successfully!',
        });
      } else {
        await createProfile(formData);
        // Show success notification for creation
        Swal.fire({
          icon: 'success',
          title: 'Profile Created',
          text: 'Your profile has been created successfully!',
        });
      }
      // Clear the form after saving
      reset();
      // Close the form
      onSave();
    } catch (error) {
      console.error('Error saving profile:', error.message);
      // Show error notification
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while saving the profile. Please try again later.',
      });
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto  flex justify-center items-center">
        <form
          className="max-w-md w-full "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="">
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                id="description"
                {...register('description')}
                rows="4"
                className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 description-textarea"
                placeholder="Tell Us More....."
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-10 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default DescriptionForm;
