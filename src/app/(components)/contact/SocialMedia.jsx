"use client"
import React from 'react';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';

function SocialMediaForm() {
  const [socialMedia, setSocialMedia] = useState([{ name: '', link: '' }]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...socialMedia];
    list[index][name] = value;
    setSocialMedia(list);
  };

  const handleAddSocialMedia = () => {
    setSocialMedia([...socialMedia, { name: '', link: '' }]);
  };

  const handleRemoveSocialMedia = (index) => {
    const list = [...socialMedia];
    list.splice(index, 1);
    setSocialMedia(list);
  };

  return (
    <div>
      <div className="grid grid-cols-1 ">
        <label
          htmlFor="social_links"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Socials
        </label>
        <button
          type="button"
          onClick={handleAddSocialMedia}
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-600 font-medium hover:underline focus:outline-none"
        >
          <AiOutlinePlus className="h-5 w-5 mr-1" />
          Add Social Media
        </button>
      </div>
      {socialMedia.map((item, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={(event) => handleInputChange(index, event)}
            placeholder="Platform Name"
            className="block py-2.5 px-0 col-span-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <input
            type="url"
            name="link"
            value={item.link}
            onChange={(event) => handleInputChange(index, event)}
            placeholder="Link"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <button
            type="button"
            onClick={() => handleRemoveSocialMedia(index)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-500 text-white focus:outline-none hover:bg-red-600"
          >
            <AiOutlineDelete className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );}

export default SocialMediaForm;
