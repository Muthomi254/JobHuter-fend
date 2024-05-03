'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguagesContext = createContext();

export const useLanguages = () => useContext(LanguagesContext);

export const LanguagesProvider = ({ children }) => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
    const [LanguageLevels, setLanguageLevels] = useState([]);

  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

  const fetchLanguages = async () => {
    try {
      const response = await fetch(`${BASE_URL}/languages`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch languages');
      }
      const data = await response.json();
      setLanguages(data);
      setLoading(false);
    } catch (error) {
      console.error('Fetch Languages Error:', error.message);
    }
  };

  const fetchLanguageLevels = async () => {
    try {
      const response = await fetch(`${BASE_URL}/language-levels`);
      if (!response.ok) {
        throw new Error('Failed to fetch language levels');
      }
      const data = await response.json();
      setLanguageLevels(data);
    } catch (error) {
      console.error('Fetch Language Levels Error:', error.message);
    }
  };


  const addLanguage = async (languageData) => {
    try {
      const response = await fetch(`${BASE_URL}/languages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(languageData),
      });
      if (!response.ok) {
        throw new Error('Failed to add language');
      }
      fetchLanguages();
    } catch (error) {
      console.error('Add Language Error:', error.message);
    }
  };

  const updateLanguage = async (languageId, languageData) => {
    try {
      const response = await fetch(`${BASE_URL}/languages/${languageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(languageData),
      });
      if (!response.ok) {
        throw new Error('Failed to update language');
      }
      fetchLanguages();
    } catch (error) {
      console.error('Update Language Error:', error.message);
    }
  };

  const deleteLanguage = async (languageId) => {
    try {
      const response = await fetch(`${BASE_URL}/languages/${languageId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete language');
      }
      // Update the state after deletion
      setLanguages((prevLanguages) =>
        prevLanguages.filter((language) => language.id !== languageId)
      );
    } catch (error) {
      console.error('Delete Language Error:', error.message);
    }
  };


  const contextValue = {
    languages,
    LanguageLevels,
    loading,
    addLanguage,
    updateLanguage,
    deleteLanguage,
    fetchLanguageLevels,
    fetchLanguages,
  };

  return (
    <LanguagesContext.Provider value={contextValue}>
      {children}
    </LanguagesContext.Provider>
  );
};
