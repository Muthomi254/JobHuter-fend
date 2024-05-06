import React from 'react';
import AuthenticatedPage from '../(context)/AuthenticatedPage';
import CvDisplay from './CvDisplay';
import Templete1 from '../(components)/templetes/Templete1';

function Page() {
  return (
          <AuthenticatedPage>

    <div className="flex">
        <div className="w-1/3">
          <CvDisplay />
        </div>

        <div className="w-2/3 pt-10">
          <Templete1 />
        </div>
    </div>
          </AuthenticatedPage>

  );
}

export default Page;
