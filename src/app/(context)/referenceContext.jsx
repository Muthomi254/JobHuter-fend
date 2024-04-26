'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ReferenceContext = createContext();

export const useReferenceContext = () => {
  return useContext(ReferenceContext);
};

export const ReferenceProvider = ({ children }) => {
  const [referenceEntries, setReferenceEntries] = useState([]);
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

  const fetchReferenceEntries = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/references`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch reference entries');
      }
      const data = await response.json();
      setReferenceEntries(data);
    } catch (error) {
      console.error('Fetch Reference Entries Error:', error.message);
    }
  };
 useEffect(() => {
   fetchReferenceEntries();
 }, []);
 
  const addReferenceEntry = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/references`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to add reference entry');
      }
      const data = await response.json();
      setReferenceEntries([...referenceEntries, data]);
    } catch (error) {
      console.error('Add Reference Entry Error:', error.message);
    }
  };

  const updateReferenceEntry = async (reference_id, formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/references/${reference_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update reference entry');
      }
      const updatedReference = await response.json();
      const updatedEntries = referenceEntries.map((entry) =>
        entry.id === id ? updatedReference : entry
      );
      setReferenceEntries(updatedEntries);
    } catch (error) {
      console.error('Update Reference Entry Error:', error.message);
    }
  };

  const deleteReferenceEntry = async (reference_id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/references/${reference_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete reference entry');
      }
      setReferenceEntries(referenceEntries.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error('Delete Reference Entry Error:', error.message);
    }
  };

 

  return (
    <ReferenceContext.Provider
      value={{
        referenceEntries,
        addReferenceEntry,
        updateReferenceEntry,
        deleteReferenceEntry,
      }}
    >
      {children}
    </ReferenceContext.Provider>
  );
};
