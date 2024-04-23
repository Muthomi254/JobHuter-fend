'use client';

import React, { useState, useEffect } from 'react';
import { useBasicInfo } from '../../(context)/basicInfoContext'; // Import BasicInfoContext
import Calender from '../Calender';
import Swal from 'sweetalert2'; // Import SweetAlert

export default function BasicInfo() {
  const { createBasicInfo, updateBasicInfo, basicInfo } = useBasicInfo(); // Access BasicInfoContext

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    job_title: '',
    date_of_birth: '',
    nationality: '',
    passport_id: '',
    gender: '',
    image_data: null, // Updated to handle file uploads
  });

  useEffect(() => {
    // Prefill the form fields with existing data when in edit mode
    if (basicInfo) {
      setFormData(basicInfo);
    }
  }, [basicInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log('form data', formData);
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
    // Check if the result is available
    if (reader.result) {
      // Split the result by comma to get the base64-encoded string
      const base64data = reader.result.split(',')[1];
      setFormData({ ...formData, image_data: base64data }); // Update the image_data field with the base64-encoded data
    } else {
      console.error('No data was read from the file.');
    }
  };

  if (file) {
    reader.readAsDataURL(file); // Read the file as data URL
  }
};



const handleSubmit = async () => {
  try {
    console.log('Submitting formData:', formData);

    if (basicInfo) {
      // Update existing basic info
      const updatedData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        job_title: formData.job_title,
        date_of_birth: formData.date_of_birth,
        nationality: formData.nationality,
        passport_id: formData.passport_id,
        gender: formData.gender,
      };

      // Create a new FormData object to handle file upload
      const updatedFormData = new FormData();
      for (const key in updatedData) {
        updatedFormData.append(key, updatedData[key]);
      }
      if (formData.image_data) {
        updatedFormData.append('image_data', formData.image_data);
      }

      await updateBasicInfo(updatedFormData); // Call updateBasicInfo with updated data
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'BasicInfo updated successfully!',
      });
    } else {
      // Create new basic info
      const formDataWithImage = new FormData();
      for (const key in formData) {
        formDataWithImage.append(key, formData[key]);
      }
      if (formData.image_data) {
        formDataWithImage.append('image_data', formData.image_data);
        console.log('image', formData.image_data);
      }
      await createBasicInfo(formDataWithImage); // Call createBasicInfo with form data
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'BasicInfo created successfully!',
      });
    }
  } catch (error) {
    console.error('Error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Failed to save BasicInfo',
    });
  }
};


  return (
    <div className="max-auto mx-auto pb-5 pt-3 h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
      >
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
            <div>
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

        <div className="flex justify-between">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-10 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        
        </div>
      </form>
    </div>
  );
}
