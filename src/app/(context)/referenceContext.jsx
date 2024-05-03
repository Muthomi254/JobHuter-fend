'use client';


import React, { createContext, useContext, useState, useEffect } from 'react';

const ReferenceContext = createContext();

export const useReferenceContext = () => useContext(ReferenceContext);

export const ReferenceProvider = ({ children }) => {
  const [referenceEntries, setReferenceEntries] = useState([]);
  const [loading, setLoading] = useState(true);
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
    } finally {
      setLoading(false);
    }
  };



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
      fetchReferenceEntries();
    } catch (error) {
      console.error('Add Reference Entry Error:', error.message);
    }
  };

  const updateReferenceEntry = async (referenceId, formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/references/${referenceId}`, {
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
      fetchReferenceEntries();
    } catch (error) {
      console.error('Update Reference Entry Error:', error.message);
    }
  };

 const deleteReferenceEntry = async (referenceId) => {
   try {
     const token = localStorage.getItem('token');
     const response = await fetch(`${BASE_URL}/references/${referenceId}`, {
       method: 'DELETE',
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
     if (!response.ok) {
       throw new Error('Failed to delete reference entry');
     }
     // Update the state after deletion
     setReferenceEntries((prevEntries) =>
       prevEntries.filter((entry) => entry.id !== referenceId)
     );
   } catch (error) {
     console.error('Delete Reference Entry Error:', error.message);
   }
 };


  const contextValue = {
    referenceEntries,
    loading,
    addReferenceEntry,
    updateReferenceEntry,
    deleteReferenceEntry,
    fetchReferenceEntries,
  };

  return (
    <ReferenceContext.Provider value={contextValue}>
      {children}
    </ReferenceContext.Provider>
  );
};
