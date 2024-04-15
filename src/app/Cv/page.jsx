import React from 'react';
import BasicInfo from '../(components)/basicInfo/BasicInfo';
import Contact from '../(components)/contact/Contact';
import Description from '../(components)/profile/Description';
import Language from '../(components)/languages/Languages';
import Education from '../(components)/education/Education';
import Experience from '../(components)/experience/Experience';
import Skills from '../(components)/skills/Skills';
import References from '../(components)/references/References';

function page() {
  return (
    <div>
      <BasicInfo />

      <Contact />

      <Description />

      <Language />

      <Education />

      <Experience />

      <Skills />

      <References />
    </div>
  );
}

export default page;
