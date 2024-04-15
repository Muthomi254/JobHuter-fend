"use client";

import { useState } from 'react';
import ReferencesForm from './ReferencesForm';
import {
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineEdit,
  AiOutlineClose,
} from 'react-icons/ai';

const ReferenceContainer = () => {
  const [showForm, setShowForm] = useState(false);
  const [references, setReferences] = useState([]);
  const [selectedReference, setSelectedReference] = useState(null);

  const handleAddReference = () => {
    setSelectedReference(null);
    setShowForm(true);
  };

  const handleEditReference = (reference) => {
    setSelectedReference(reference);
    setShowForm(true);
  };

  const handleSaveReference = (reference) => {
    if (selectedReference) {
      const updatedReferences = references.map((ref) =>
        ref.id === selectedReference.id ? reference : ref
      );
      setReferences(updatedReferences);
    } else {
      setReferences([...references, reference]);
    }
    setShowForm(false);
  };

  const handleDeleteReference = (id) => {
    setReferences(references.filter((ref) => ref.id !== id));
  };

  return (
    <div className="max-w-md mx-auto pb-10 pt-5">
      <h2 className="text-xl font-medium text-gray-900 mb-5">References</h2>
      {references.map((reference) => (
        <div
          key={reference.id}
          className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mb-3"
        >
          <div>
            <p>{reference.name}</p>
            <p>{reference.job_title}</p>
            {/* Add other reference details here */}
          </div>
          <div>
            <button onClick={() => handleEditReference(reference)}>
              <AiOutlineEdit /> Edit
            </button>
            <button onClick={() => handleDeleteReference(reference.id)}>
              <AiOutlineDelete /> Delete
            </button>
          </div>
        </div>
      ))}
      {showForm ? (
        <div>
          <button
            onClick={() => setShowForm(false)}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            <div className="grid grid-cols-2">
              <AiOutlineClose className="h-5 w-5 mr-1" /> Close
            </div>
          </button>
          <ReferencesForm
            reference={selectedReference}
            onSave={handleSaveReference}
            onCancel={() => setShowForm(false)}
          />
        </div>
      ) : (
        <button
          onClick={handleAddReference}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <div className="grid grid-cols-2">
            <AiOutlinePlus className="h-5 w-5 mr-1" />
            Add Reference
          </div>
        </button>
      )}
    </div>
  );
};

export default ReferenceContainer;
