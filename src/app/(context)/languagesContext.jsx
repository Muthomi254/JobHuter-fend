'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the LanguagesContext
const LanguagesContext = createContext();

// Create a custom hook to use the LanguagesContext
export const useLanguages = () => useContext(LanguagesContext);

// Define the LanguagesProvider component
export const LanguagesProvider = ({ children }) => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchLanguages();
  }, []); // Fetch languages when component mounts

  // Fetch all languages
  const fetchLanguages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/languages`);
      setLanguages(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching languages:', error);
    }
  };

  // Add a new language
  const addLanguage = async (languageData) => {
    try {
      await axios.post(`${BASE_URL}/languages`, languageData);
      fetchLanguages(); // Refresh languages after adding
    } catch (error) {
      console.error('Error adding language:', error);
    }
  };

  // Update a language
  const updateLanguage = async (languageId, languageData) => {
    try {
      await axios.put(`${BASE_URL}/languages/${languageId}`, languageData);
      fetchLanguages(); // Refresh languages after updating
    } catch (error) {
      console.error('Error updating language:', error);
    }
  };

  // Delete a language
  const deleteLanguage = async (languageId) => {
    try {
      await axios.delete(`${BASE_URL}/languages/${languageId}`);
      fetchLanguages(); // Refresh languages after deleting
    } catch (error) {
      console.error('Error deleting language:', error);
    }
  };

  return (
    <LanguagesContext.Provider
      value={{
        languages,
        loading,
        addLanguage,
        updateLanguage,
        deleteLanguage,
      }}
    >
      {children}
    </LanguagesContext.Provider>
  );
};
