'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';

function ProfessionalExperienceForm() {
  const [employer, setEmployer] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if start date is greater than or equal to end date
    if (new Date(startDate) >= new Date(endDate)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Start date must be before end date!',
      });
      return;
    }
    // Proceed with form submission
    // Add your submission logic here
  };

  return (
    <div className="max-w-md mx-auto  pb-10 pt-10">
      <form onSubmit={handleSubmit} className="max-w-md w-full px-4">
        {/* <h2 className="text-xl font-medium text-gray-900 mb-5">
          Professional Experience
        </h2> */}

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
              value={employer}
              onChange={(e) => setEmployer(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Employer"
              required
            />
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
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Job Title"
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
              value={city}
              onChange={(e) => setCity(e.target.value)}
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
              value={country}
              onChange={(e) => setCountry(e.target.value)}
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
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
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
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 description-textarea"
              placeholder="Description"
              rows="4"
              required
            ></textarea>
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
