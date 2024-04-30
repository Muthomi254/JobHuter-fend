'use client';

// ContactContainer.js

import React, { useState, useEffect } from 'react';
import {
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineEdit,
  AiOutlineDelete,
} from 'react-icons/ai';
import ContactForm from './ContactForm';
import EditModal from '../ui-components/EditModal';
import { useContact } from '../../(context)/contactContext';
import { Button } from 'flowbite-react';

const ContactContainer = () => {
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const { contacts, fetchContacts, deleteContact } = useContact();

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleOpenModal = (contactId) => {
    setSelectedContactId(contactId);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleDeleteContact = async (contactId) => {
    try {
      await deleteContact(contactId);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-medium text-gray-900 mb-5">
        Contact Information
      </h2>
      {!showForm && (
        <button
          onClick={handleToggleForm}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <div className="flex items-center">
            <AiOutlinePlus className="h-5 w-5 mr-1" />
            Add Contact Info
          </div>
        </button>
      )}
      {showForm && (
        <div>
          <button
            onClick={handleToggleForm}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            <div className="flex items-center">
              <AiOutlineClose className="h-5 w-5 mr-1" />
              Close
            </div>
          </button>
          <ContactForm />
        </div>
      )}

      {/* Render EditModal */}
      <EditModal
        open={open}
        title="Edit Contact"
        size="md"
        className="bg-transparent"
        onClose={handleCloseModal}
      >
        {/* Pass existing contact data to ContactForm */}
        <ContactForm
          existingData={contacts.find(
            (contact) => contact.id === selectedContactId
          )}
        />
      </EditModal>

      {/* Display fetched contacts */}
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="bg-white shadow-md rounded-lg p-6 mt-4 "
        >
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-md font-semibold">Email:</span>
              <span className="text-gray-800">{contact.cv_email}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-md font-semibold">Phone Number:</span>
              <span className="text-gray-800">{contact.phone}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-md font-semibold">Address:</span>
              <span className="text-gray-800">{contact.address}</span>
            </div>
            <div className="flex  justify-between  flex-col-2 underline">
              <div className="flex flex-col">
                <span className="text-md font-semibold mb-2">
                  Platform Names:
                </span>
                {contact.platform_name.split(',').map((platform, index) => (
                  <span key={index} className="text-gray-800">
                    {platform}
                  </span>
                ))}
              </div>
              <div className="flex flex-col text-right">
                <span className="text-md font-semibold mb-2">Links:</span>
                {contact.social_links.split(',').map((link, index) => (
                  <div key={index} className="flex justify-end">
                    <a href={link} className="text-blue-500 hover:underline">
                      {link}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex">
            <Button
              onClick={() => handleOpenModal(contact.id)}
              color="light"
              className="bg-transparent text-blue-700 font-semibold  py-2 px-4 mr-2"
            >
              <AiOutlineEdit className="h-5 w-5 mr-1" />
              Edit
            </Button>
            <Button
              onClick={() => handleDeleteContact(contact.id)}
              color="light"
              className="bg-transparent text-red-700 font-semibold py-2 px-4"
            >
              <AiOutlineDelete className="h-5 w-5 mr-1" />
              Delete
            </Button>
          </div>
          {/* Add more fields as needed */}
        </div>
      ))}
    </div>
  );
};

export default ContactContainer;
