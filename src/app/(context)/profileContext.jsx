'use client';

// profileContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

  const fetchProfiles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch profiles');
      }
      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error('Fetch Profiles Error:', error.message);
    }
  };


  const createProfile = async (profileData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
      if (!response.ok) {
        throw new Error('Failed to create profile');
      }
      fetchProfiles();
    } catch (error) {
      console.error('Create Profile Error:', error.message);
    }
  };

  const updateProfile = async (profileId, profileData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/profile/${profileId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      fetchProfiles();
    } catch (error) {
      console.error('Update Profile Error:', error.message);
    }
  };

  // Function to delete profile
  const deleteProfile = async (profileId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/profile/${profileId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete profile');
      }

      // Update profiles state after deletion
      setProfiles((prevProfiles) =>
        prevProfiles.filter((profile) => profile.id !== profileId)
      );
    } catch (error) {
      console.error('Delete Profile Error:', error.message);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        fetchProfiles,
        createProfile,
        updateProfile,
        deleteProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
