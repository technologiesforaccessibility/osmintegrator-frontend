import './mapManager.scss';

import { FC, useContext } from 'react';

import { MapContext } from '../contexts/MapContextProvider';
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar';
import MapView from '../mapComponents/View/MapView';

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
