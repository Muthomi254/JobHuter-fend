import React from 'react';

export default function Page() {
 
 

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="max-w-md w-full px-4">
        <div class="relative z-0 w-full mb-5 group">
          <label for="floating_email" class="block mb-2 text-sm font-medium  ">
            Email address
          </label>
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            class="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=" "
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-grey-900 "
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="confirm_password"
            class="block mb-2 text-sm font-medium text-grey-900 "
          >
            Confirm password
          </label>
          <input
            type="password"
            id="confirm_password"
            class="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>
        <div class="flex items-start mb-5 text-sm font-small text-grey-900">
          Already have an account?
          <a
            href="/login"
            class="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-600 font-medium  hover:underline ml-2"
          >
            Login
          </a>
        </div>

        <div class="flex items-start mb-6">
          <div class="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div>

          <label
            for="remember"
            class="ms-2 text-sm font-medium text-grey-900 dark:text-gray-300"
          >
            I agree with the{' '}
            <a
              href="#"
              class="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
            .
          </label>
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new account
        </button>
      </form>
    </div>
  );
}
