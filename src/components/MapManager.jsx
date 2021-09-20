import { useState } from 'react';
import { useSelector } from 'react-redux';

import MapView from './MapView';
import DashboardSidebar from './DashboardSidebar';
import { selectAuthIsLoggedIn } from '../redux/selectors/authSelector';

import '../stylesheets/mapManager.scss';

const MapManager = () => {

  const [propertyGrid, setPropertyGrid] = useState(null);

  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  function updatePropertyGrid(newGrid) {
    setPropertyGrid(newGrid);
  }

  return (
    <div className="map-manager">
      <div className="map-manager__sidebar">
        <DashboardSidebar
          isLoggedIn={isLoggedIn}
          propertyGrid={propertyGrid}
          updatePropertyGrid={updatePropertyGrid} />
      </div>
      <div className="map-manager__map" >
        <MapView />
      </div>
    </div>
  );
};

export default MapManager;
