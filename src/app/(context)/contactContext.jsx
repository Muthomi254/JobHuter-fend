// contactContext.js

import React, { createContext, useContext, useState } from 'react';

const ContactContext = createContext();

export const useContact = () => useContext(ContactContext);

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  // Function to fetch contacts
  const fetchContacts = async () => {
    // Make API request to fetch contacts
    try {
      const response = await fetch('/api/contacts');
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        console.error('Failed to fetch contacts');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  // Function to create a new contact
  const createContact = async (contactData) => {
    // Make API request to create contact
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      if (response.ok) {
        fetchContacts(); // Fetch updated contacts after creating a new one
      } else {
        console.error('Failed to create contact');
      }
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  // Function to update an existing contact
  const updateContact = async (contactId, contactData) => {
    // Make API request to update contact
    try {
      const response = await fetch(`/api/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      if (response.ok) {
        fetchContacts(); // Fetch updated contacts after updating
      } else {
        console.error('Failed to update contact');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  return (
    <ContactContext.Provider
      value={{ contacts, fetchContacts, createContact, updateContact }}
    >
      {children}
    </ContactContext.Provider>
  );
};
