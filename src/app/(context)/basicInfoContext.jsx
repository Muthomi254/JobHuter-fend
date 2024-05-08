'use client'

// BasicInfoContext.js
import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
const BasicInfoContext = createContext();

export const useBasicInfo = () => useContext(BasicInfoContext);

export const BasicInfoProvider = ({ children }) => {
  const [basicInfo, setBasicInfo] = useState(null);

const createBasicInfo = async (formData) => {
  try {
    // Convert FormData to JSON object
    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    const response = await axios.post(`${BASE_URL}/basic-info`, jsonData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log('BasicInfo created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating BasicInfo:', error);
    throw new Error('Failed to create BasicInfo');
  }
};

 

 const updateBasicInfo = async (formData) => {
   try {
     const response = await axios.patch(
       `${BASE_URL}/basic-info`, // Update the endpoint to /basic-info
       formData,
       {
         headers: {
           'Content-Type': 'application/json',
               'Accept':'application/json',
           Authorization: `Bearer ${localStorage.getItem('token')}`,
         },
       }
     );
     console.log('BasicInfo updated successfully:', response.data);
     return response.data;
   } catch (error) {
     console.error('Error updating BasicInfo:', error);
     throw new Error('Failed to update BasicInfo');
   }
 };





 

  const fetchBasicInfo = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/basic-info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBasicInfo(response.data); // Update the basicInfo state with the fetched data
    } catch (error) {
      console.error('Error fetching BasicInfo:', error);
      throw new Error('Failed to fetch BasicInfo');
    }
  };

  const fetchBasicInfoById = async (basicInfoId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/basic-info/${basicInfoId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Fetched BasicInfo by ID:', response.data);
      setBasicInfo(response.data); // Update the basicInfo state with the fetched data
    } catch (error) {
      console.error('Error fetching BasicInfo by ID:', error);
      throw new Error('Failed to fetch BasicInfo');
    }
  };

  const value = {
    basicInfo,
    createBasicInfo,
    updateBasicInfo,
    fetchBasicInfo,
    fetchBasicInfoById,
  };

  return (
    <BasicInfoContext.Provider value={value}>
      {children}
    </BasicInfoContext.Provider>
  );
};
