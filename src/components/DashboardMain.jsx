import React from 'react';

import MapView from './MapView';
import Toolbar from './Toolbar';
import Dashboard from './Dashboard';

const DashboardMain = () => {
  return (
    <Dashboard>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">OSM Integrator</h1>
          <Toolbar />
        </div>

        <div className="forMapView">
          <MapView />
        </div>
      </main>
    </Dashboard>
  );
};

export default DashboardMain;
