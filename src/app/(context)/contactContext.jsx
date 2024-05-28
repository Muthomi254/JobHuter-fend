"use client";

// contactContext.js

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

const ContactContext = createContext();

export const useContact = () => useContext(ContactContext);

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

  // Function to fetch contacts
  const fetchContacts = useCallback(async () => {
    // Make API request to fetch contacts
    try {
      const response = await fetch(`${BASE_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        console.error('Failed to fetch contacts');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  });

  // Function to create a new contact
  const createContact = async (contactData) => {
    // Make API request to create contact
    try {
      const response = await fetch(`${BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
      const response = await fetch(`${BASE_URL}/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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

  // Function to delete a contact
  const deleteContact = async (contactId) => {
    try {
      const response = await fetch(`${BASE_URL}/contacts/${contactId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
      // Update the state after deletion
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== contactId)
      );
    } catch (error) {
      console.error('Delete Contact Error:', error.message);
    }
  };



   const value = useMemo(
     () => ({
       contacts,
       fetchContacts,
       createContact,
       updateContact,
       deleteContact,
     }),
     [contacts, fetchContacts, createContact, updateContact, deleteContact]
   );

  return (
 

    <ContactContext.Provider
      value={
        value
      }
    >
      {children}
    </ContactContext.Provider>
  );
};
