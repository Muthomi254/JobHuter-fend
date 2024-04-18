'use client';

// BasicInfoContainer.js
import { useState, useEffect } from 'react';
import Modal from '../ui-components/EditModal'; // Import the Modal component
import BasicInfoForm from './BasicInfoForm'; // Import the BasicInfoForm component
import { useBasicInfo } from '../../(context)/basicInfoContext'; // Import useBasicInfo hook
import { AiOutlinePlus, AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';

import { Button } from 'flowbite-react';
import CustomModal from '../ui-components/CustomModal';

const BasicInfoContainer = () => {
  const [showForm, setShowForm] = useState(false);
  const { basicInfo, fetchBasicInfo } = useBasicInfo(); // Access basicInfo state and fetchBasicInfo function

  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchBasicInfo();
  }, []);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="max-w-md mx-auto pb-5 pt-5 cursor-pointer">
      <h2 className="text-xl font-medium text-gray-900 mb-5">
        Personal Information
      </h2>

      {basicInfo ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          {basicInfo.image_data && (
            <div className="mb-6 flex justify-between items-center">
              <div>
                <img
                  src={`data:image/png;base64,${basicInfo.image_data}`}
                  alt="User"
                  className="w-32 h-32 rounded-full"
                />
              </div>
              <div className="flex items-center">
                {/* <Button
                  onClick={handleOpenModal}
                  className="bg-transparent text-blue-700  hover:text-white-800 text-sm font-semibold py-2 px-4  "
                >
                  <AiOutlineEdit className="h-5 w-5 mr-1" />
                  Edit
                </Button> */}

                {/* CustomModal with BasicInfoForm  */}
                {/* <CustomModal
                  open={open}
                  title="Basic Info"
                  size="md"
                  className="bg-transparent"
                  onClose={handleCloseModal}
                >
                  <BasicInfoForm />
                </CustomModal> */}

                <Modal
                  buttonContent={
                    <>
                      <AiOutlineEdit className="h-5 w-5 mr-1" />
                      Edit
                    </>
                  }
                >
                  
                  <BasicInfoForm initialData={basicInfo} />
                </Modal>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <div className="mb-6">
              <p className="text-lg font-semibold mb-2">Name:</p>
              <p className="text-gray-800">
                {basicInfo.first_name} {basicInfo.last_name}
              </p>
            </div>
            <div className="mb-6">
              <p className="text-lg font-semibold mb-2">Job Title:</p>
              <p className="text-gray-800">{basicInfo.job_title}</p>
            </div>
            <div className="mb-6">
              <p className="text-lg font-semibold mb-2">Date of Birth:</p>
              <p className="text-gray-800">{basicInfo.date_of_birth}</p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-2">Nationality:</p>
              <p className="text-gray-800">{basicInfo.nationality}</p>
            </div>
            <div className="mb-6">
              <p className="text-lg font-semibold mb-2">Passport ID:</p>
              <p className="text-gray-800">{basicInfo.passport_id}</p>
            </div>
            <div className="mb-6">
              <p className="text-lg font-semibold mb-2">Gender:</p>
              <p className="text-gray-800">{basicInfo.gender}</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <button
            onClick={handleToggleForm}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            <div className="flex items-center">
              {showForm ? (
                <>
                  <AiOutlineClose className="h-5 w-5 mr-1" />
                  Close
                </>
              ) : (
                <>
                  <AiOutlinePlus className="h-5 w-5 mr-1" />
                  Add Personal Info
                </>
              )}
            </div>
          </button>
          {showForm && <BasicInfoForm />}
        </>
      )}
    </div>
  );
};

export default BasicInfoContainer;


