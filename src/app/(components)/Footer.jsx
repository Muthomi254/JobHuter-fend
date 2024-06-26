import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Footer() {
  return (
    <footer className="bg-white shadow dark:bg-gray-900  ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/Cv">
            <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
              <Image
                src="/cv_7images.png"
                className=" "
                width={80}
                height={50}
                alt="Job Hunter Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Job Hunter
              </span>
            </div>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="/about">
                <div className="hover:underline me-4 md:me-6">About</div>
              </Link>
            </li>
            <li>
              <Link href="/Policy">
                <div className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </div>
              </Link>
            </li>

            <li>
              <Link href="/Contacts">
                <div className="hover:underline">Contact</div>
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

        <div className="flex items-center justify-center flex-wrap">
          <span className="inline-block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 Job Hunter™ . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
