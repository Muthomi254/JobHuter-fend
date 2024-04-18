'use client';

// Modal.js
import React from 'react';
import { useModal } from '../(context)/modalContext';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ buttonContent, children }) => {
  const { showModal, openModal, closeModal } = useModal();

 return (
   <>
     <button
       onClick={openModal}
       className="text-blue-500 hover:text-blue-700 focus:outline-none flex items-center pt-10"
     >
       {buttonContent}
     </button>
     {showModal && (
       <div className=" pt-20 fixed inset-0 flex justify-center items-center">
         <div className="absolute inset-0 bg-black opacity-50"></div>
         <div className=" p-8 rounded-lg z-10 max-w-md w-full max-h-screen overflow-y-auto">
           <button
             onClick={closeModal}
             className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
           >
             <AiOutlineClose className="h-5 w-5" />
           </button>
           {children}
         </div>
       </div>
     )}
   </>
 );};


export default Modal;
