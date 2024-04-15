"use client"

import  { useState } from 'react';
import SkillForm from './SkillsForm';
import {
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineEdit,
  AiOutlineClose,
} from 'react-icons/ai';

const Skills = () => {
  const [showForm, setShowForm] = useState(false);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleAddSkill = () => {
    setSelectedSkill(null);
    setShowForm(true);
  };

  const handleEditSkill = (skill) => {
    setSelectedSkill(skill);
    setShowForm(true);
  };

  const handleSaveSkill = (skill) => {
    if (selectedSkill) {
      const updatedSkills = skills.map((s) =>
        s.id === selectedSkill.id ? skill : s
      );
      setSkills(updatedSkills);
    } else {
      setSkills([...skills, skill]);
    }
    setShowForm(false);
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  return (
    <div className="max-w-md mx-auto pb-10 pt-5 ">
      <h2 className="text-xl font-medium text-gray-900 mb-5">Skills</h2>
      {skills.map((skill, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mb-3"
        >
          <div>
            <p>{skill.skill}</p>
            <p>{skill.info}</p>
            <p>Skill Level: {skill.skillLevel}</p>
          </div>
          <div>
            <button
              onClick={() => handleEditSkill(skill)}
              className="text-blue-500 hover:text-blue-700 focus:outline-none"
            >
              <AiOutlineEdit />
            </button>
            <button
              onClick={() => handleDeleteSkill(index)}
              className="text-red-500 hover:text-red-700 focus:outline-none ml-3"
            >
              <AiOutlineDelete />
            </button>
          </div>
        </div>
      ))}
      {showForm ? (
        <div>
          <button
            className="text-red-500 hover:text-red-700 focus:outline-none"
            onClick={() => setShowForm(false)}
          >
            <div className="grid grid-cols-2">
              <AiOutlineClose className="h-5 w-5 mr-1" /> Close
            </div>
          </button>
          <SkillForm
            skill={selectedSkill}
            onSave={handleSaveSkill}
            onCancel={() => setShowForm(false)}
          />
        </div>
      ) : (
        <button
          onClick={handleAddSkill}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <div className="grid grid-cols-2">
            <AiOutlinePlus className="h-5 w-5 mr-1" />
            Add Skill
          </div>
        </button>
      )}
    </div>
  );
};

export default Skills;
