"use client";

import { useState } from 'react';
import LanguageForm from './LanguageForm';
import {
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineEdit,
  AiOutlineClose,
} from 'react-icons/ai';

function Languages() {
  const [showForm, setShowForm] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleAddLanguage = () => {
    setSelectedLanguage(null);
    setShowForm(true);
  };

  const handleEditLanguage = (language) => {
    setSelectedLanguage(language);
    setShowForm(true);
  };

  const handleSaveLanguage = (language) => {
    if (selectedLanguage) {
      const updatedLanguages = languages.map((lang) =>
        lang.id === selectedLanguage.id ? language : lang
      );
      setLanguages(updatedLanguages);
    } else {
      setLanguages([...languages, language]);
    }
    setShowForm(false);
  };

  const handleDeleteLanguage = (id) => {
    setLanguages(languages.filter((lang) => lang.id !== id));
  };

  return (
    <div className="max-w-md mx-auto pb-5 pt-5 ">
      <h2 className="text-xl font-medium text-gray-900 mb-5">Languages</h2>
      {languages.map((language, index) => (
        <div
          key={language.id}
          className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mb-3"
        >
          <div>{language.name}</div>
          <div>
            <button onClick={() => handleEditLanguage(language)}>
              <AiOutlineEdit />
            </button>
            <button onClick={() => handleDeleteLanguage(language.id)}>
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
            <AiOutlineClose /> Close
          </button>
          <LanguageForm
            onSave={handleSaveLanguage}
            onCancel={() => setShowForm(false)}
            language={selectedLanguage}
          />
        </div>
      ) : (
        <button
          onClick={handleAddLanguage}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <div className="flex items-center">
            <AiOutlinePlus className="h-5 w-5 mr-1" />
            Add Language
          </div>
        </button>
      )}
    </div>
  );
}

export default Languages;
