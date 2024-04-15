'use client';

import React, { useState } from 'react';

const SkillForm = ({ onSave, onCancel }) => {
  const [skill, setSkill] = useState('');
  const [info, setInfo] = useState('');
  const [skillLevel, setSkillLevel] = useState('Beginner');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if skill field is not empty
    if (!skill.trim()) {
      alert('Please enter a skill');
      return;
    }
    // Save the skill data
    onSave({ skill, info, skillLevel });
    // Clear the form fields
    setSkill('');
    setInfo('');
    setSkillLevel('Beginner');
  };

  return (
    <div className="max-w-md mx-auto  pb-10 pt-10">
      <form onSubmit={handleSubmit} className="max-w-md w-full px-4">
        <div className="mb-4">
          <label
            htmlFor="skill"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Skill
          </label>
          <input
            type="text"
            id="skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Enter skill"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="skillLevel"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Skill Level
          </label>
          <select
            id="skillLevel"
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
            className="input-style"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="additional_info"
            className="block mb-2 text-sm font-medium text-gray-900 mt-5"
          >
            Additional Info
          </label>
          <textarea
            id="additional_info"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 description-textarea"
            placeholder="Additional Info"
            rows="4"
          ></textarea>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default SkillForm;
