'use client';

import React from 'react';
import { Spinner } from 'flowbite-react';

export default function SpinnerLoader() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <div className="flex flex-wrap items-center gap-2">
        <Spinner aria-label="Loading..." size="xl" />
      </div>
    </div>
  );
}
