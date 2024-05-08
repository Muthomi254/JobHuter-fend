"use client"

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

function Calender({ selected, onChange }) {
  const [startDate, setStartDate] = useState(selected);

  const handleChange = (date) => {
    setStartDate(date);
    onChange(date);
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        placeholderText="Select a date"
        dateFormat="dd/MM/yyyy"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={50}
        required
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      />
    </div>
  );
}

export default Calender;
