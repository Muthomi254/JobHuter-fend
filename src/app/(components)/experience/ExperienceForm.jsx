'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useExperience } from '../../(context)/experienceContext'; // Import the experience context

function ProfessionalExperienceForm({ existingData, onSave }) {
  const {
    register,
    handleSubmit,
     reset,
    formState: { errors },
  } = useForm();
  const { addExperienceEntry, updateExperienceEntry } = useExperience(); // Access the context functions


    useEffect(() => {
      // If existingData exists, populate the form fields with its values
      if (existingData) {
        reset(existingData);
      }
    }, [existingData, reset]);

  const onSubmit = async (data) => {
    // Check if start date is greater than or equal to end date
    if (new Date(data.start_date) >= new Date(data.end_date)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Start date must be before end date!',
      });
      return;
    }

    try {
      // Determine if it's an add or update operation
      if (data.id) {
        await updateExperienceEntry(data.id, data); // Update existing entry
      } else {
        await addExperienceEntry(data); // Add new entry
      }
      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Experience entry saved successfully!',
      });

       if (onSave) {
         onSave();
       }
       
    } catch (error) {
      console.error('Error saving experience entry:', error.message);
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save experience entry. Please try again later.',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto pb-10 pt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full px-4">
        <div className="grid gap-6 mb-10 md:grid-cols-2">
          <div>
            <label
              htmlFor="employer"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Employer
            </label>
            <input
              type="text"
              id="employer"
              {...register('employer', { required: true })}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Employer"
            />
            {errors.employer && <span>This field is required</span>}
          </div>
          <div>
            <label
              htmlFor="job_title"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Job Title
            </label>
            <input
              type="text"
              id="job_title"
              {...register('job_title', { required: true })}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Job Title"
            />
            {errors.job_title && <span>This field is required</span>}
          </div>
          <div>
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              {...register('city', { required: true })}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="City"
            />
            {errors.city && <span>This field is required</span>}
          </div>
          <div>
            <label
              htmlFor="country"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              {...register('country', { required: true })}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Country"
            />
            {errors.country && <span>This field is required</span>}
          </div>
          <div>
            <label
              htmlFor="start_date"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Start Date
            </label>
            <input
              type="date"
              id="start_date"
              {...register('start_date', { required: true })}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            {errors.start_date && <span>This field is required</span>}
          </div>
          <div>
            <label
              htmlFor="end_date"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              End Date
            </label>
            <input
              type="date"
              id="end_date"
              {...register('end_date', { required: true })}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            {errors.end_date && <span>This field is required</span>}
          </div>
          <div className="col-span-2">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register('description', { required: true })}
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 description-textarea"
              placeholder="Description"
              rows="4"
            ></textarea>
            {errors.description && <span>This field is required</span>}
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-10 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default ProfessionalExperienceForm;