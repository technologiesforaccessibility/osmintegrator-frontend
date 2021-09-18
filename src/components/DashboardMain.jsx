import React from 'react';

import MapView from './MapView';
import Dashboard from './Dashboard';

const DashboardMain = () => {
  return (
    <Dashboard>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

        <div className="forMapView">
          <MapView />
        </div>
      </main>
    </Dashboard>
  );
};

export default DashboardMain;
