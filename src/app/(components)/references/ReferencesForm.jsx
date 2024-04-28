'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useReferenceContext } from '../../(context)/referenceContext'; // Import the context
import Swal from 'sweetalert2'; // Import SweetAlert

function ReferenceForm({ existingData, onSave }) {
  const { register, handleSubmit, reset } = useForm();
  const { addReferenceEntry, updateReferenceEntry } = useReferenceContext(); // Use the context

  // Initialize state for form data
  const [formData, setFormData] = useState(
    existingData || {
      name: '',
      job_title: '',
      organization: '',
      email: '',
      phone: '',
    }
  );

  useEffect(() => {
    // If existingData exists, populate the form fields with its values
    if (existingData) {
      setFormData(existingData);
    }
  }, [existingData]);

  const onSubmitForm = (data) => {
    if (existingData) {
      updateReferenceEntry(existingData.id, data)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Reference Updated',
            text: 'Reference has been successfully updated!',
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Error updating reference: ${error.message}`,
          });
        });
    } else {
      addReferenceEntry(data)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Reference Added',
            text: 'Reference has been successfully added!',
          });
          // Clear form fields after successful addition
          setFormData({
            name: '',
            job_title: '',
            organization: '',
            email: '',
            phone: '',
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Error adding reference: ${error.message}`,
          });
        });
    }

    onSave(data); // Call onSave function passed from parent component
  };

  return (
    <div className="max-w-md mx-auto pb-10 pt-5">
      <h2 className="text-xl font-medium text-gray-900 mb-5">
        {existingData ? 'Edit Reference' : 'Add Reference'}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="max-w-md w-full px-4"
      >
        <div className="grid gap-6 mb-10 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
          {/* Repeat similar input fields for other form fields */}
          {/* Job Title */}
          <div>
            <label
              htmlFor="job-title"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Job Title
            </label>
            <input
              type="text"
              id="job_title"
              {...register('job_title')}
              value={formData.job_title}
              onChange={(e) =>
                setFormData({ ...formData, job_title: e.target.value })
              }
              required
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
          {/* Organization */}
          <div>
            <label
              htmlFor="organization"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Organization
            </label>
            <input
              type="text"
              id="organization"
              {...register('organization')}
              value={formData.organization}
              onChange={(e) =>
                setFormData({ ...formData, organization: e.target.value })
              }
              required
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone')}
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {existingData ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReferenceForm;
