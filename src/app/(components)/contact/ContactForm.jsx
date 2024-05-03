'use client';
'use client';
import React, { useEffect, useState } from 'react';
import SocialMedia from './SocialMedia';
import { useForm } from 'react-hook-form';
import { Button } from 'flowbite-react';
import { useContact } from '../../(context)/contactContext';
import Swal from 'sweetalert2';


function ContactForm({ existingData }) {
  const { register, handleSubmit, reset } = useForm();
  const { createContact, updateContact } = useContact();
  const [selectedContact, setSelectedContact] = useState(null);

  // Reset the form when existingData changes
  useEffect(() => {
    if (existingData) {
      setSelectedContact(existingData);
      reset(existingData);
    } else {
      reset({});
    }
  }, [existingData, reset]);


 const onSubmit = async (data) => {
   try {
     const { socialMedia, ...contactData } = data;

     // Check if socialMedia exists before mapping
     const socialMediaData = socialMedia
       ? socialMedia.map(({ platform_name, social_links }) => ({
           platform_name,
           social_links,
         }))
       : [];

     const formData = {
       ...contactData,
       social_media: socialMediaData.slice(0, 10),
     };

     if (selectedContact) {
       // If selectedContact exists, update the contact
       await updateContact(selectedContact.id, formData);
       // Show success notification
       Swal.fire({
         icon: 'success',
         title: 'Success',
         text: 'Contact updated successfully',
       });
     } else {
       // If selectedContact does not exist, create a new contact
       await createContact(formData);
       // Show success notification
       Swal.fire({
         icon: 'success',
         title: 'Success',
         text: 'Contact created successfully',
       });
     }
     // Reset the form after submission
     reset({});
   } catch (error) {
     console.error('Error:', error);
     // Show error notification
     Swal.fire({
       icon: 'error',
       title: 'Error',
       text: 'Failed to save contact',
     });
   }
 };

 const handleEdit = (contact) => {
   // Set selectedContact when editing a contact
   setSelectedContact(contact);
 };

 const handleCancelEdit = () => {
   // Reset selectedContact when canceling edit
   setSelectedContact(null);
   // Reset the form
   reset({});
 };



  

  return (
    <div>
      <div className="max-w-md mx-auto pb-10 h-screen flex justify-center items-center">
        <form
          className="max-w-md w-full px-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-6 mb-10 md:grid-cols-2">
            <div>
              <label
                htmlFor="cv_email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                CV Email
              </label>
              <input
                type="text"
                id="cv_email"
                name="cv_email"
                defaultValue={selectedContact ? selectedContact.cv_email : ''}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="john@example.com"
                required
                {...register('cv_email')}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                defaultValue={selectedContact ? selectedContact.phone : ''}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Phone Number"
                required
                {...register('phone')}
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                defaultValue={selectedContact ? selectedContact.address : ''}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Address"
                required
                {...register('address')}
              />
            </div>

            <SocialMedia
              register={register}
              existingData={
                selectedContact
                  ? {
                      socialMedia: selectedContact.platform_name
                        ? selectedContact.platform_name
                            .split(',')
                            .map((platform, index) => ({
                              platform_name: platform.trim(), // Trim to remove extra spaces
                              social_links: selectedContact.social_links
                                .split(',')
                                [index]?.trim(), // Trim to remove extra spaces
                            }))
                        : [], // Pass an empty array if no platform name is available
                    }
                  : { socialMedia: [] } // Pass an empty array if no selectedContact
              }
            />

            {/* Render the SocialMedia component */}
          </div>

          <div className="flex justify-between">
            <Button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-10 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              {selectedContact ? 'Update' : 'Save'}
            </Button>
            {selectedContact && (
              <Button
                onClick={handleCancelEdit}
                className="text-white bg-red-50 hover:bg-red-500 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 mb-10 dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-red-800"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
