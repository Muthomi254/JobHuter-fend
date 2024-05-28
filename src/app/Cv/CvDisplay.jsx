"use client";
import React, { useState, useEffect } from 'react';
import BasicInfo from '../(components)/basicInfo/BasicInfo';
import Contact from '../(components)/contact/Contact';
import Description from '../(components)/profile/Description';
import Language from '../(components)/languages/Languages';
import Education from '../(components)/education/Education';
import Experience from '../(components)/experience/Experience';
import Skills from '../(components)/skills/Skills';
import References from '../(components)/references/References';
import Spinner from '@/app/(components)/ui-components/Spinner';

function CvDisplay() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate an API call to fetch data
    const fetchData = async () => {
      try {
        // Simulate loading time with a timeout
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container  mx-auto px-4 py-8">
      <div className="p-2 m-6">
        <BasicInfo />
        <Description />

        <Contact />
        <Language />
        <Education />
        <Experience />
        <Skills />
        <References />
      </div>
    </div>
  );
}

export default CvDisplay;
