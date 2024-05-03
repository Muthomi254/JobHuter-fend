import React from 'react';
import AuthenticatedPage from '../(context)/AuthenticatedPage';
import CvDisplay from './CvDisplay';
import Templete1 from '../(components)/templetes/Templete1';

function Page() {
  return (
    <div className="flex">
      <AuthenticatedPage>
        <div className="w-1/2">
          <CvDisplay />
        </div>
      </AuthenticatedPage>
      <AuthenticatedPage>
        <div className="w-1/2">
          <Templete1 />
        </div>
      </AuthenticatedPage>
    </div>
  );
}

export default Page;
