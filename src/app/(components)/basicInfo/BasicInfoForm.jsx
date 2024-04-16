'use client';

import React, { useState } from 'react';
import { useBasicInfo } from '../../(context)/basicInfoContext'; // Import BasicInfoContext
import Calender from '../Calender';
 import Swal from 'sweetalert2'; // Import SweetAlert


export default function BasicInfo() {
  const { createBasicInfo } = useBasicInfo(); // Access createBasicInfo function from BasicInfoContext
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    job_title: '',
    date_of_birth: '',
    nationality: '',
    passport_id: '',
    gender: '',
    image_data: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

 const handleDateChange = (date) => {
   // Convert selected date to the correct format
   const formattedDate = date ? date.toISOString().split('T')[0] : '';
   setFormData({ ...formData, date_of_birth: formattedDate });

 };


 const handleImageChange = (e) => {
   const file = e.target.files[0];
   const reader = new FileReader();
   reader.onloadend = () => {
     // Convert the image data to base64 format
     const imageData = reader.result.split(',')[1];
     setFormData({ ...formData, image_data: imageData }); // Update the image_data field with the base64-encoded image data
   };
   reader.readAsDataURL(file); // Read the file as data URL
 };


 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     console.log('Form Data:', formData); // Log formData
     await createBasicInfo(formData); // Call createBasicInfo function with formData
     console.log('BasicInfo created successfully!');
     // Show success notification
     Swal.fire({
       icon: 'success',
       title: 'Success!',
       text: 'BasicInfo created successfully!',
     });
   } catch (error) {
     console.error('Error creating BasicInfo:', error);
     // Show error notification
     Swal.fire({
       icon: 'error',
       title: 'Error!',
       text: 'Failed to create BasicInfo',
     });
   }
 };

  return (
    <div className="max-w-md mx-auto pb-5 pt-3 h-screen flex justify-center items-center ">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-10  md:grid-cols-2">
          <div>
            <label
              htmlFor="first_name"
              className="block  mb-2 text-sm font-medium text-gray-900"
            >
              First name
            </label>
            <input
              type="text"
              id="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="John"
              required
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Last name
            </label>
            <input
              type="text"
              id="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Doe"
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
              value={formData.job_title}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Software Engineer"
              required
            />
          </div>
          <div>
            <label
              htmlFor="date_of_birth"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Date of birth
            </label>
            <div className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
              <Calender
                selected={formData.date_of_birth}
                onChange={handleDateChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="nationality"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nationality
            </label>
            <input
              id="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Kenyan"
              required
            />
          </div>
          <div>
            <label
              htmlFor="passport_id"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              ID/Passport
            </label>
            <input
              id="passport_id"
              value={formData.passport_id}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="123-45-678"
              required
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="input-style"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Binary</option>
            </select>
          </div>
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            htmlFor="file_input"
          >
            Upload image
          </label>

          <input
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            onChange={handleImageChange} // Call handleImageChange on file selection
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, JPG or GIF (MAX. 800x400px).
          </p>
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
