"use client"

import React, { useState, useEffect } from 'react';
import {
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineEdit,
  AiOutlineClose,
  AiFillCaretDown,
  AiFillCaretUp,
} from 'react-icons/ai';
import SkillForm from './SkillsForm'; // Assuming you have a SkillForm component
import { useSkillContext } from '../../(context)/skillContext';
import EditModal from '../ui-components/EditModal';
import Swal from 'sweetalert2';

const Skills = () => {
  const { skills, deleteSkill, fetchSkills } = useSkillContext();

  const [showForm, setShowForm] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleAddSkill = () => {
    setSelectedSkill(null);
    setShowForm(true);
  };

  const handleEditSkill = (skill) => {
    setSelectedSkill(skill);
    setOpenEditModal(true);
  };


  const handleDeleteSkill = (id) => {
    Swal.fire({
      title: 'Delete Skill?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSkill(id);
        Swal.fire('Deleted!', 'Your skill has been deleted.', 'success');
        if (selectedSkill && selectedSkill.id === id) {
          setSelectedSkill(null);
        }
      }
    });
  };

  const handleToggleDetails = (skill) => {
    setSelectedSkill((prevSelectedSkill) => {
      if (prevSelectedSkill && prevSelectedSkill.id === skill.id) {
        return null; // Close the details if already open
      } else {
        return skill; // Open the details if closed or another skill is clicked
      }
    });
  };

  return (
    <div className="max-w-md mx-auto pb-5 pt-5">
      <h2 className="text-xl font-medium text-gray-900 mb-5">Skills</h2>
      {!showForm && (
        <button
          onClick={handleAddSkill}
          className="text-blue-500 hover:text-blue-700 focus:outline-none mb-4"
        >
          <div className="flex items-center">
            <AiOutlinePlus className="h-5 w-5 mr-1" />
            Add Skill
          </div>
        </button>
      )}

      <ul className="mt-4">
        {skills.map((skill) => (
          <li key={skill.id} className="mb-8">
            <div
              className="cursor-pointer flex justify-between items-center"
              onClick={() => handleToggleDetails(skill)} // <-- Call handleToggleDetails on click
            >
              <p className="font-semibold text-blue-500 text-md">
                {skill.skill}
              </p>
              <div>
                {selectedSkill && selectedSkill.id === skill.id ? (
                  <AiFillCaretUp className="h-5 w-5 text-blue-500 mr-2" />
                ) : (
                  <AiFillCaretDown className="h-5 w-5 text-blue-500 mr-2" />
                )}
              </div>
            </div>
            {selectedSkill && selectedSkill.id === skill.id && (
              <div className="border border-gray-200 p-6 rounded-lg shadow-md mt-4">
                <p className="text-gray-600">
                  <span className="font-semibold">Skill:</span> {skill.skill}
                </p>

                <p className="text-gray-600">
                  <span className="font-semibold">Skill Level:</span>{' '}
                  {skill.skill_level}
                </p>

                <p className="text-gray-600">
                  <span className="font-semibold">Info:</span> {skill.info}
                </p>
                <div className="text-right mt-4">
                  <button
                    onClick={() => handleEditSkill(skill)}
                    className="text-blue-700 hover:text-green-600 focus:outline-none mr-2"
                  >
                    <AiOutlineEdit className="h-5 w-5 mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="text-red-600 hover:text-red-400 focus:outline-none"
                  >
                    <AiOutlineDelete className="h-5 w-5 mr-1" /> Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {showForm && (
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
            existingData={selectedSkill}
            onSave={() => setShowForm(false)}
          />
        </div>
      )}

      <EditModal
        open={openEditModal}
        title="Edit Skill"
        size="md"
        onClose={() => setOpenEditModal(false)}
      >
        {selectedSkill && (
          <SkillForm
            existingData={selectedSkill}
            onSave={() => setOpenEditModal(false)}
          />
        )}
      </EditModal>
    </div>
  );
};

export default Skills;
