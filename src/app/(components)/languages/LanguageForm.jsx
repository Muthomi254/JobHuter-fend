import React from 'react';

const LanguageForm = () => {
  return (
    <div className="max-w-md mx-auto pb-10 h-screen flex justify-center items-center">
      <form class="max-w-md w-full px-4">
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
              className="input-style block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            >
              <option
                value=""
                disabled
                selected
                class="text-gray-100 text-sm font-medium"
                
              >
                  Select Language Level
                
              </option>
              <option value="Novice">Novice</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Fluent">Fluent</option>
              <option value="Advanced">Advanced</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                />
              </svg>
            </div>
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
