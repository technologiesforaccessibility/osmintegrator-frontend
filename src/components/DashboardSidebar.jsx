import {useContext} from 'react';
import {useSelector} from 'react-redux';

import PropertyGrid from './PropertyGrid';
import MapPanel from './MapPanel';

import FinishTile from './FinishTile';
import {MapContext} from './contexts/MapContextProvider';
import {selectLoggedInUserRoles} from '../redux/selectors/authSelector';
import {roles} from '../utilities/constants';

import './../stylesheets/dashboardSidebar.scss';

const DashboardSidebar = () => {
  const {propertyGrid, isTileActive} = useContext(MapContext);
  const authRoles = useSelector(selectLoggedInUserRoles);

  return (
    <div className="sidebar">

      <div className="sidebar__navigation">
        <MapPanel />
      </div>
      <div className="sidebar__details">{propertyGrid && <PropertyGrid propertyGrid={propertyGrid} />}</div>
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
