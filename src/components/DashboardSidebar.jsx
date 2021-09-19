import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import PropertyGrid from './PropertyGrid';
import MapPanel from './MapPanel';
import LanguageSwitch from './LanguageTest';

import FinishTile from './FinishTile';
import { MapContext } from './contexts/MapContextProvider';
import { selectLoggedInUserRoles } from '../redux/selectors/authSelector';
import { roles } from '../utilities/constants';

import './../stylesheets/dashboardSidebar.scss';

const { REACT_APP_MVP_DISABLED } = process.env;

const DashboardSidebar = () => {
  const { propertyGrid, isTileActive } = useContext(MapContext);
  const authRoles = useSelector(selectLoggedInUserRoles);

  return (
    <div className="sidebar">
      {/* <div className="sidebar__language">
        {!REACT_APP_MVP_DISABLED && <LanguageSwitch />}
      </div> */}

      <div className="sidebar__navigation">
        <MapPanel />
      </div>
      <div className="sidebar__details">
        {propertyGrid && <PropertyGrid propertyGrid={propertyGrid} />}
      </div>
      <div className="sidebar__approve">
        {isTileActive && authRoles.some(role => [roles.SUPERVISOR, roles.EDITOR].includes(role)) && (
          <div className="sidebar__finish-tile">
            <FinishTile />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
