import React from 'react';

function Description() {
  return (
    <div>
      <div className="max-w-md mx-auto pb-10  h-screen flex justify-center items-center">
        <form className="max-w-md w-full px-4">
          {' '}
          <div class="grid gap-6 mb-10  md:grid-cols-2">
            <div>
              <label
                for="  Description"
                class="block  mb-2 text-sm font-medium text-gray-900 "
              >
                Description
              </label>
              <input
                type="textarea"
                id="  Description"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                required
              />
            </div>
          </div>
          <button
            type="save"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-10 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Description;
