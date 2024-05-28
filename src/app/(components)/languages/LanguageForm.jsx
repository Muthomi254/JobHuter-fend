'use client';



import React, { useState, useEffect } from 'react';
import { useLanguages } from '../../(context)/languagesContext';
import Swal from 'sweetalert2';

const LanguageForm = ({ language: initialLanguage, onSave }) => {
  const { addLanguage, updateLanguage, LanguageLevels, loading } =
    useLanguages();

  const [language, setLanguage] = useState({
    language: '',
    language_level: '',
    additional_info: '',
  });

  useEffect(() => {
    if (initialLanguage) {
      setLanguage(initialLanguage);
    }
  }, [initialLanguage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLanguage((prevLanguage) => ({
      ...prevLanguage,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!language.language || !language.language_level) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill out language and language level',
      });
      return;
    }

    const languageLevelUpperCase = language.language_level.toUpperCase();

    try {
      if (initialLanguage) {
        await updateLanguage(initialLanguage.id, {
          ...language,
          language_level: languageLevelUpperCase,
        });
      } else {
        await addLanguage({
          ...language,
          language_level: languageLevelUpperCase,
        });
      }

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Language entry saved successfully!',
      });
      onSave();
      setLanguage({
        language: '',
        language_level: '',
        additional_info: '',
      });
    } catch (error) {
      console.error('Error saving language entry:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save language entry. Please try again later.',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto pt-2 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="max-w-md w-full px-4">
        <div>
          <div>
            <label
              htmlFor="language"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Language
            </label>
            <input
              type="text"
              id="language"
              name="language"
              value={language.language}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Language"
              required
            />
          </div>
          <div>
            <label
              htmlFor="language_level"
              className="block mb-2 text-sm font-medium text-gray-900 mt-5"
            >
              Language Level
            </label>
            <select
              id="language_level"
              name="language_level"
              value={language.language_level}
              onChange={handleChange}
              className="input-style block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            >
              <option value="">Select Language Level</option>
              {Object.values(LanguageLevels).map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label
            htmlFor="additional_info"
            className="block mb-2 text-sm font-medium text-gray-900 mt-5"
          >
            Additional Info
          </label>
          <textarea
            id="additional_info"
            name="additional_info"
            value={language.additional_info}
            onChange={handleChange}
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 description-textarea"
            placeholder="Additional Info"
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full mt-5 sm:w-auto px-5 py-2.5 mb-10 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default LanguageForm;
