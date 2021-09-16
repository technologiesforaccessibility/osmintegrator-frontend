import React, {useContext} from 'react';
import {useSelector} from 'react-redux';

import PropertyGrid from './PropertyGrid';
import MapPanel from './MapPanel';
import LanguageSwitch from './LanguageTest';
import VersionLabel from './VersionLabel';
import FinishTile from './FinishTile';
import {MapContext} from './contexts/MapContextProvider';
import {selectLoggedInUserRoles} from './../redux/selectors/authSelector';
import {roles} from './../utilities/constants';

import './../stylesheets/dashboardSidebar.scss';

const {REACT_APP_MVP_DISABLED} = process.env;

const DashboardSiderbar = () => {
  const {propertyGrid, isTileActive} = useContext(MapContext);
  const authRoles = useSelector(selectLoggedInUserRoles);

  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="full-height position-sticky pt-3 sidebar__container">
        {!REACT_APP_MVP_DISABLED && <LanguageSwitch />}
        <VersionLabel />
        <div className="sidebar__features">
          <MapPanel />
          {propertyGrid && <PropertyGrid propertyGrid={propertyGrid} />}
        </div>
        {isTileActive && authRoles.some(role => [roles.SUPERVISOR, roles.EDITOR].includes(role)) && (
          <div className="sidebar__finish-tile">
            <FinishTile />
          </div>
        )}
      </div>
    </nav>
  );
};

export default DashboardSiderbar;
