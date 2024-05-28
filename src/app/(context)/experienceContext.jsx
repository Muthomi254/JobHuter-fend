'use client';

  // experienceContext.js
import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';

const ExperienceContext = createContext();

export const useExperience = () => useContext(ExperienceContext);

export const ExperienceProvider = ({ children }) => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';


  const fetchExperiences = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/experience`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch experiences');
      }
      const data = await response.json();
      setExperiences(data);
      setLoading(false);
    } catch (error) {
      console.error('Fetch Experiences Error:', error.message);
    }
  });

  

 const addExperienceEntry = async (experienceData) => {
   try {
     
     const response = await fetch(`${BASE_URL}/experience`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${localStorage.getItem('token')}`,
       },
       body: JSON.stringify(experienceData),
     });
     if (!response.ok) {
       throw new Error('Failed to add experience entry');
     }
     fetchExperiences();
   } catch (error) {
     console.error('Add Experience Entry Error:', error.message);
   }
 };


  const updateExperienceEntry = async (experienceId, experienceData) => {
    try {
      const response = await fetch(`${BASE_URL}/experience/${experienceId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(experienceData),
      });
      if (!response.ok) {
        throw new Error('Failed to update experience entry');
      }
      fetchExperiences();
    } catch (error) {
      console.error('Update Experience Entry Error:', error.message);
    }
  };

  const deleteExperienceEntry = async (experienceId) => {
    try {
      const response = await fetch(`${BASE_URL}/experience/${experienceId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete experience entry');
      }
      // Update the state after deletion
      setExperiences((prevEntries) =>
        prevEntries.filter((entry) => entry.id !== experienceId)
      );
    } catch (error) {
      console.error('Delete Experience Entry Error:', error.message);
    }
  };

  


  const value = useMemo(
    () => ({
      experiences,
      loading,
      addExperienceEntry,
      updateExperienceEntry,
      deleteExperienceEntry,
      fetchExperiences,
    }),
    [
      experiences,
      loading,
      addExperienceEntry,
      updateExperienceEntry,
      deleteExperienceEntry,
      fetchExperiences,
    ]
  );
  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
};
