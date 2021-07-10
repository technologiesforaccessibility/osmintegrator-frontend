import React, {useContext} from 'react';

import PropertyGrid from './PropertyGrid';
import MapPanel from './MapPanel';
import SidebarMenu from './SidebarMenu';
import LanguageSwitch from './LanguageTest';
import NewReport from "./NewReport";

import {MapContext} from './contexts/MapContextProvider';
import RecentlySeenTileList from './RecentlySeenTileList';

const DashboardSiderbar = props => {
  const {propertyGrid} = useContext(MapContext);

  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="full-height position-sticky pt-3">
        <LanguageSwitch />
        <SidebarMenu />
        <RecentlySeenTileList />
        <MapPanel />
        {propertyGrid && <PropertyGrid propertyGrid={propertyGrid} updatePropertyGrid={props.updatePropertyGrid} />}
      </div>
    </nav>
  );
};

export default DashboardSiderbar;
