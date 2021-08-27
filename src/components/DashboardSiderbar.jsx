import React, {useContext} from 'react';

import PropertyGrid from './PropertyGrid';
import MapPanel from './MapPanel';
import SidebarMenu from './SidebarMenu';
import LanguageSwitch from './LanguageTest';
import VersionLabel from './VersionLabel';
import FinishTile from './FinishTile';
import {MapContext} from './contexts/MapContextProvider';

import './../stylesheets/dashboardSidebar.scss';

const DashboardSiderbar = () => {
  const {propertyGrid, activeTile} = useContext(MapContext);

  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="full-height position-sticky pt-3 sidebar__container">
        <LanguageSwitch />
        <VersionLabel />
        <div className="sidebar__features">
          <SidebarMenu />
          <MapPanel />
          {propertyGrid && <PropertyGrid propertyGrid={propertyGrid} />}
        </div>
        {activeTile && <FinishTile />}
      </div>
    </nav>
  );
};

export default DashboardSiderbar;
