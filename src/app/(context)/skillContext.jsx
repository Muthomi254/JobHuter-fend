'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

const SkillContext = createContext();

export const useSkillContext = () => useContext(SkillContext);

export const SkillProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

  const fetchSkills = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/skills`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch skills');
      }
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error('Fetch Skills Error:', error.message);
    }
  });

  

  const addSkill = async (skillData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(skillData),
      });
      if (!response.ok) {
        throw new Error('Failed to add skill');
      }
      fetchSkills();
    } catch (error) {
      console.error('Add Skill Error:', error.message);
    }
  };

  const updateSkill = async (skillId, skillData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/skills/${skillId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(skillData),
      });
      if (!response.ok) {
        throw new Error('Failed to update skill');
      }
      fetchSkills();
    } catch (error) {
      console.error('Update Skill Error:', error.message);
    }
  };

  const deleteSkill = async (skillId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/skills/${skillId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete skill');
      }
      // Update the state after deletion
      setSkills((prevSkills) =>
        prevSkills.filter((skill) => skill.id !== skillId)
      );
    } catch (error) {
      console.error('Delete Skill Error:', error.message);
    }
  };


 const value = useMemo(
   () => ({
     skills,
     addSkill,
     updateSkill,
     deleteSkill,
     fetchSkills,
   }),
   [skills, addSkill, updateSkill, deleteSkill, fetchSkills]
 );

  return (
    <SkillContext.Provider
      value={ value }
    >
      {children}
    </SkillContext.Provider>
  );
};
