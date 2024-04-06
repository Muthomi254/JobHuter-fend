
import React from 'react'
import SocialMedia from './SocialMedia';




function Contact() {


  return (
    <div>
      <div className="max-w-md mx-auto pb-10 pt-20 h-screen flex justify-center items-center">
        <form className="max-w-md w-full px-4">
          {' '}
          <div class="grid gap-6 mb-10  md:grid-cols-2">
            <div>
              <label
                for=" cv_email"
                class="block  mb-2 text-sm font-medium text-gray-900 "
              >
                Cv_email
              </label>
              <input
                type="text"
                id=" cv_email"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="john@example.com"
                required
              />
            </div>
            <div>
              <label
                for=" Phone"
                class="block mb-2  text-sm font-medium text-gray-900 "
              >
                Phone Number
              </label>

              <input
                type="Integer"
                id=" Phone"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="+5666899666"
                required
              />
            </div>
            <div>
              <label
                for="address"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Address"
                required
              />
            </div>

            <SocialMedia />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact