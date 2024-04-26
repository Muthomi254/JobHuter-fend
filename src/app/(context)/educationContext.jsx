'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const EducationContext = createContext();

export const useEducationContext = () => {
  return useContext(EducationContext);
};

export const EducationProvider = ({ children }) => {
  const [educationEntries, setEducationEntries] = useState([]);

  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

  const fetchEducationEntries = async () => {
    try {
      const response = await fetch(`${BASE_URL}/education`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch education entries');
      }
      const data = await response.json();
      setEducationEntries(data);
    } catch (error) {
      console.error('Fetch Education Entries Error:', error.message);
    }
  };

  const addEducationEntry = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Authorization Token:', token);
      console.log('Form Data:', formData); // Log form data here
      const response = await fetch(`${BASE_URL}/education`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      console.log('Response:', response);

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Failed to add education entry:', errorMessage);
        throw new Error('Failed to add education entry');
      }

      fetchEducationEntries(); // Refetch entries after adding
    } catch (error) {
      console.error('Add Education Entry Error:', error.message);
    }
  };

  const updateEducationEntry = async (id, formData) => {
    try {
      const response = await fetch(`${BASE_URL}/education/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update education entry');
      }
      fetchEducationEntries(); // Refetch entries after updating
    } catch (error) {
      console.error('Update Education Entry Error:', error.message);
    }
  };

  const deleteEducationEntry = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/education/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete education entry');
      }
      fetchEducationEntries(); // Refetch entries after deleting
    } catch (error) {
      console.error('Delete Education Entry Error:', error.message);
    }
  };

  useEffect(() => {
    fetchEducationEntries();
  }, []); // Fetch entries on component mount

  // Return an object with the context values
  const contextValue = {
    educationEntries,
    addEducationEntry,
    updateEducationEntry,
    deleteEducationEntry,
  };

  return (
    <EducationContext.Provider value={contextValue}>
      {children}
    </EducationContext.Provider>
  );
};

