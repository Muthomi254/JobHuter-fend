'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSkillContext } from '../../(context)/skillContext'; // Import the useSkillContext hook
import Swal from 'sweetalert2'; // Import SweetAlert

const SkillForm = ({ onSave, onCancel, existingData }) => {
  const { register, handleSubmit, reset } = useForm();
  const { addSkill, updateSkill } = useSkillContext(); // Access the skill context functions

  useEffect(() => {
    if (existingData) {
      reset(existingData); // Prefill the form with existing skill data when updating
    }
  }, [existingData, reset]);

  const onSubmit = (data) => {
    if (existingData) {
      // Update the skill if existingData exists
      updateSkill(existingData.id, data)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Skill Updated',
            text: 'Your skill has been updated successfully!',
          });
        })
        .catch((error) => {
          console.error('Update Skill Error:', error.message);
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'Failed to update skill. Please try again later.',
          });
        });
    } else {
      // Add a new skill if existingData is null
      addSkill(data)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Skill Added',
            text: 'Your skill has been added successfully!',
          });
        })
        .catch((error) => {
          console.error('Add Skill Error:', error.message);
          Swal.fire({
            icon: 'error',
            title: 'Addition Failed',
            text: 'Failed to add skill. Please try again later.',
          });
        });
    }
    reset();
    onSave();
  };


  return (
    <div className="max-w-md mx-auto pb-10 pt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full px-4">
        <div className="mb-4">
          <label
            htmlFor="skill"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Skill
          </label>
          <input
            type="text"
            id="skill"
            {...register('skill', { required: true })}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Enter skill"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="skill_level"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Skill Level
          </label>
          <select
            id="skill_level"
            {...register('skill_level')}
            className="input-style"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="info"
            className="block mb-2 text-sm font-medium text-gray-900 mt-5"
          >
            Additional Info
          </label>
          <textarea
            id="info"
            {...register('info')}
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 description-textarea"
            placeholder="Additional Info"
            rows="4"
          ></textarea>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {existingData ? 'Update' : 'Save'}
            {/* Change button text based on whether updating or adding */}
          </button>
         
        </div>
      </form>
    </div>
  );
};

export default SkillForm;
