import {useContext} from 'react';
import {useSelector} from 'react-redux';

import PropertyGrid from './PropertyGrid';
import MapPanel from './MapPanel';

import FinishTile from './FinishTile';
import {MapContext} from './contexts/MapContextProvider';
import {selectLoggedInUserRoles} from '../redux/selectors/authSelector';
import {roles} from '../utilities/constants';
import NewReport from './NewReport';
import EditReport from './EditReport';
import ConnectionSidePanel from './ConnectionSidePanel';

import './../stylesheets/dashboardSidebar.scss';


const DashboardSidebar = () => {
  const {propertyGrid, isTileActive, isViewMode, isReportMapMode, isConnectionMode, isEditingReportMode, openReport} =
    useContext(MapContext);
  const authRoles = useSelector(selectLoggedInUserRoles);

  return (
    <div className="sidebar">
      <div className="sidebar__navigation">
        <MapPanel />
      </div>
      <div className="sidebar__details">
        {propertyGrid && isViewMode && <PropertyGrid propertyGrid={propertyGrid} />}
        {isReportMapMode && <NewReport />}
        {isEditingReportMode && openReport && <EditReport />}
        {isConnectionMode && <ConnectionSidePanel />}
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
