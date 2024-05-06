import React from 'react';
import AuthenticatedPage from '../(context)/AuthenticatedPage';
import CvDisplay from './CvDisplay';
import Templete1 from '../(components)/templetes/Templete1';

function Page() {
  return (
          <AuthenticatedPage>

    <div className="flex flex-row">
        <div className="w-auto">
          <CvDisplay />
        </div>

        <div className="w-auto">
          <Templete1 />
        </div>
    </div>
          </AuthenticatedPage>

  );
}

export default Page;
