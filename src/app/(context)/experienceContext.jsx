'use client';

  // experienceContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ExperienceContext = createContext();

export const useExperience = () => useContext(ExperienceContext);

export const ExperienceProvider = ({ children }) => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
  const fetchExperiences = async () => {
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
  };

  

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
      fetchExperiences();
    } catch (error) {
      console.error('Delete Experience Entry Error:', error.message);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const contextValue = {
    experiences,
    loading,
    addExperienceEntry,
    updateExperienceEntry,
    deleteExperienceEntry,
  };

  return (
    <ExperienceContext.Provider value={contextValue}>
      {children}
    </ExperienceContext.Provider>
  );
};
