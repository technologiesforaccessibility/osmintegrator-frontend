import { useContext, FC } from 'react';

import MapView from './MapView';
import { MapContext } from './contexts/MapContextProvider';
import DashboardSidebar from './DashboardSidebar';

import '../stylesheets/mapManager.scss';

const HomeLayoutManager: FC = () => {
  const { isTileActive } = useContext(MapContext);

  return (
    <div className="map-manager">
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

export default HomeLayoutManager;
