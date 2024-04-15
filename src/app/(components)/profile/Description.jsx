

import React from 'react';

function Description() {
  return (
    <div>
      <div className="max-w-md mx-auto pb-5 h-screen flex justify-center items-center">
        <form className="max-w-md w-full px-4">
          <div className="grid gap-6 mb-10 md:grid-cols-2">
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                id="message"
                rows="4"
                className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 description-textarea"
                placeholder="Tell Us More....."
              ></textarea>
            </div>
          </div>
          <button
            type="save"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-10 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Description;
