"use client"

import React from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import  { useState } from 'react';


function Calender() {

  const [selected, setSelected] = useState(null);

  return (
    <div>
      <DatePicker
        selected={selected}
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-blue-500 appearance-none dark:text-gray dark:border-blue-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        onChange={(date) => setSelected(date)}
        placeholderText="Select Date of Birth"
        dateFormat="dd/MM/yyyy"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={50}
        required
      />
    </div>
  );
}

export default Calender