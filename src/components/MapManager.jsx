import {useContext} from 'react';

import MapView from './MapView';
import {MapContext} from './contexts/MapContextProvider';
import DashboardSidebar from './DashboardSidebar';

import '../stylesheets/mapManager.scss';

const MapManager = () => {
  const {isTileActive} = useContext(MapContext);

  return (
    <div
      className="map-manager"
      style={
        isTileActive
          ? {gridTemplateAreas: 'sidebar map', gridTemplateColumns: '20% 80%'}
          : {gridTemplateAreas: 'sidebar map', gridTemplateColumns: '0% 100%'}
      }>
      {isTileActive && (
        <div className="map-manager__sidebar">
          <DashboardSidebar />
        </div>
      )}
      <div className="map-manager__map">
        <MapView />
      </div>
    </div>
  );
};

export default MapManager;
