import React from 'react';
import AuthenticatedPage from '../(context)/AuthenticatedPage'; // Import the AuthenticatedPage component
import BasicInfo from '../(components)/basicInfo/BasicInfo';
import Contact from '../(components)/contact/Contact';
import Description from '../(components)/profile/Description';
import Language from '../(components)/languages/Languages';
import Education from '../(components)/education/Education';
import Experience from '../(components)/experience/Experience';
import Skills from '../(components)/skills/Skills';
import References from '../(components)/references/References';
function CvDisplay() {
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

export default CvDisplay