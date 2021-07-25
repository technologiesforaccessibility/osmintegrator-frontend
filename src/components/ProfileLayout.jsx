import React from 'react';
import Dashboard from './Dashboard';

export default function ProfileLayout({children}) {
  return (
    <Dashboard>
      <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          Profile
        </div>
        <div>{children}</div>
      </div>
    </Dashboard>
  );
}
