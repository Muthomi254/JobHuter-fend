'use client';

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useEducationContext } from '../../(context)/educationContext'; // Import the context

function EducationForm({ existingData, onSave }) {
  const { register, handleSubmit, setValue } = useForm();
  const { addEducationEntry, updateEducationEntry } = useEducationContext(); // Use the context

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // UseEffect to set form values if existing data is passed
  useEffect(() => {
    if (existingData) {
      setValue('course_title', existingData.course_title);
      setValue('institution', existingData.institution);
      setValue('city', existingData.city);
      setValue('country', existingData.country);
      setValue('start_date', existingData.start_date);
      setValue('end_date', existingData.end_date);
      setValue('description', existingData.description);
      setStartDate(existingData.start_date);
      setEndDate(existingData.end_date);
    }
  }, [existingData, setValue]);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const onSubmitForm = (data) => {
    const formData = {
      course_title: data.course_title,
      institution: data.institution,
      city: data.city,
      country: data.country,
      start_date: data.start_date,
      end_date: data.end_date,
      description: data.description,
    };

    if (startDate > endDate) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Date Range',
        text: 'End Date should be greater than Start Date',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (existingData) {
      updateEducationEntry(existingData.id, formData); // Call update function from context
      Swal.fire({
        icon: 'success',
        title: 'Education Entry Updated',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    } else {
      addEducationEntry(formData); // Call add function from context
      Swal.fire({
        icon: 'success',
        title: 'Education Entry Added',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    }

    onSave(formData); // Call onSave function passed from parent component
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="max-w-md mx-auto pt-2 flex justify-center items-center">
      <form
        className="max-w-md w-full px-4"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <div className="grid gap-6 mb-10 md:grid-cols-2">
          <div>
            <label
              htmlFor="course_title"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Course Title
            </label>
            <input
              type="text"
              id="course_title"
              {...register('course_title')}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Course Title"
              required
            />
          </div>
          <div>
            <label
              htmlFor="institution"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Institution
            </label>
            <input
              type="text"
              id="institution"
              {...register('institution')}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Institution"
              required
            />
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
              {...register('city')}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="City"
              required
            />
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
              {...register('country')}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Country"
              required
            />
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
              {...register('start_date')}
              value={startDate}
              onChange={handleStartDateChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            />
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
              {...register('end_date')}
              value={endDate}
              onChange={handleEndDateChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            />
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
              {...register('description')}
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 description-textarea"
              placeholder="Description"
              rows="4"
              // required
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-10 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {existingData ? 'Update' : 'Save'}
        </button>
      </form>
    </div>
  );
}

export default EducationForm;
