import React from 'react';
import AuthenticatedPage from '../(context)/AuthenticatedPage';
import CvDisplay from './CvDisplay';
import Templete1 from '../(components)/templetes/Templete1';

function Page() {
  return (
    <AuthenticatedPage>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2">
          <CvDisplay />
        </div>

        <div className="w-full lg:w-1/2">
          <Templete1 />
        </div>
      </div>
    </AuthenticatedPage>
  );
}

export default Page;
