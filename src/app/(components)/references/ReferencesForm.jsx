'use client';

import React, { useState } from 'react';

const ReferenceForm = ({ reference, onSave, onCancel }) => {
  const [name, setName] = useState(reference ? reference.name : '');
  const [jobTitle, setJobTitle] = useState(
    reference ? reference.job_title : ''
  );
  const [organization, setOrganization] = useState(
    reference ? reference.organization : ''
  );
  const [email, setEmail] = useState(reference ? reference.email : '');
  const [phone, setPhone] = useState(reference ? reference.phone : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReference = {
      id: reference ? reference.id : null,
      name,
      job_title: jobTitle,
      organization,
      email,
      phone,
    };
    onSave(newReference);
  };

  return (
    <div className="max-w-md mx-auto pb-10 pt-5">
      <h2 className="text-xl font-medium text-gray-900 mb-5">
        {reference ? 'Edit Reference' : 'Add Reference'}
      </h2>
      <form onSubmit={handleSubmit} className="max-w-md w-full px-4">
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
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
              placeholder="Software Engineer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
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
              placeholder="John Doe Inc"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              required
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
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
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
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
              placeholder="3536877686"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReferenceForm;
