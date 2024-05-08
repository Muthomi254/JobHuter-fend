'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useBasicInfo } from '../../(context)/basicInfoContext'; // Import BasicInfoContext
import Calender from '../Calender';
import Swal from 'sweetalert2'; // Import SweetAlert

export default function BasicInfo() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const { createBasicInfo, updateBasicInfo, basicInfo } = useBasicInfo(); // Access BasicInfoContext

  const formData = watch(); // Access form data

  useEffect(() => {
    // Prefill the form fields with existing data when in edit mode
    if (basicInfo) {
      Object.keys(basicInfo).forEach((key) => setValue(key, basicInfo[key]));
    }
  }, [basicInfo, setValue]);

  const handleDateChange = (date) => {
    setValue('date_of_birth', date);
  };

  const onSubmit = async (data) => {
    try {
      console.log('Submitting formData:', data);

      if (basicInfo) {
        await updateBasicInfo(data); // Call updateBasicInfo with updated data
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'BasicInfo updated successfully!',
        });
      } else {
        try {
          const formData = new FormData();
          for (const key in data) {
            if (key === 'image_data') {
              // Check if image data exists and is properly encoded
              if (
                data[key] &&
                data[key].type &&
                data[key].type.startsWith('image')
              ) {
                formData.append(key, data[key]);
              } else {
                throw new Error('Invalid image data format');
              }
            } else {
              formData.append(key, data[key]);
            }
          }

          await createBasicInfo(formData); // Call createBasicInfo with form data
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'BasicInfo created successfully!',
          });
        } catch (error) {
          console.error('Error creating BasicInfo:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to create BasicInfo',
          });
        }
      }

      // reset(); // Reset form after submission
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
        onSubmit={handleSubmit(onSubmit)}
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
              {...register('first_name', { required: true })}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="John"
            />
            {errors.first_name && <span>This field is required</span>}
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
              {...register('last_name', { required: true })}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Doe"
            />
            {errors.last_name && <span>This field is required</span>}
          </div>
          <div>
            <label
              htmlFor="cv_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              CV Name
            </label>
            <input
              type="text"
              id="cv_name"
              {...register('cv_name')}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Google's cv"
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
              {...register('job_title', { required: true })}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Software Engineer"
            />
            {errors.job_title && <span>This field is required</span>}
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
              {...register('nationality', { required: true })}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Kenyan"
            />
            {errors.nationality && <span>This field is required</span>}
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
              {...register('passport_id', { required: true })}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="123-45-678"
            />
            {errors.passport_id && <span>This field is required</span>}
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
              {...register('gender', { required: true })}
              className="input-style"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Binary</option>
            </select>
            {errors.gender && <span>This field is required</span>}
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
            {...register('image_data')}
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
