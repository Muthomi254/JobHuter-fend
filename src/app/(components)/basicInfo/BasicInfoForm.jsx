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
    // Convert the date to UTC string without time zone information
    const formattedDate = date.toISOString().slice(0, 10);
    setValue('date_of_birth', formattedDate);
  };

// Function to convert file to base64
const convertToBase64 = (file) => {
  console.log('File type:', typeof file);
  console.log('File instanceof Blob:', file instanceof Blob);

  return new Promise((resolve, reject) => {
    if (!(file instanceof Blob)) {
      reject(new Error('Parameter is not a Blob object'));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result.split(',')[1]; // Extract base64 part of the data URL
      resolve(base64Image);
    };
    reader.onerror = (error) => reject(error);
  });
};


 const onSubmit = async (data) => {
   try {
     console.log('Submitting formData:', data);
    console.log('Type of image_data:', typeof data.image_data);
        console.log('image_data field exists:', 'image_data' in data);
    
    if (basicInfo) {
       // Handle updating existing basic information
       try {
         const formData = new FormData();
         for (const key in data) {
           if (key === 'image_data') {
             const file = data[key][0]; // Get the file object
             if (file instanceof Blob) {
               // Check if it's a Blob object
               // Convert image data to base64 before appending
               const base64Image = await convertToBase64(file); // Pass the file directly to convertToBase64
               console.log('Base64 image:', base64Image);
               formData.append(key, base64Image);
             } else {
               // Handle if the file is not a Blob object
               console.error('Selected file is not a Blob object:', file);
             }
           } else {
             formData.append(key, data[key]);
           }
         }

         console.log('Final FormData:', formData);
         await updateBasicInfo(formData); // Call updateBasicInfo with form data
         Swal.fire({
           icon: 'success',
           title: 'Success!',
           text: 'BasicInfo updated successfully!',
         });
       } catch (error) {
         console.error('Error updating BasicInfo:', error);
         Swal.fire({
           icon: 'error',
           title: 'Error!',
           text: 'Failed to update BasicInfo',
         });
       }
     } else {
       try {
         const formData = new FormData();
         for (const key in data) {
           if (key === 'image_data') {
             const file = data[key][0]; // Get the file object
             if (file instanceof Blob) {
               // Check if it's a Blob object
               // Convert image data to base64 before appending
               const base64Image = await convertToBase64(file); // Pass the file directly to convertToBase64
               console.log('Base64 image:', base64Image); // Log base64 image data
               formData.append(key, base64Image);
             } else {
               // Handle if the file is not a Blob object
               console.error('Selected file is not a Blob object:', file);
             }
           } else {
             formData.append(key, data[key]);
           }
         }

         console.log('Final FormData:', formData); // Log the final FormData object
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

     //  reset(); // Reset form after submission
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
            id="file_input"
            type="file"
            {...register('image_data')} // Register the file input with name 'image_data'
            aria-describedby="file_input_help"
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
