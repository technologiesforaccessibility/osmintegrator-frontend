import {useContext} from 'react';
import {useSelector} from 'react-redux';

import PropertyGrid from './PropertyGrid';
import MapPanel from './MapPanel';
import FinishTile from './FinishTile';
import {MapContext, MapModes} from './contexts/MapContextProvider';
import {selectLoggedInUserRoles} from '../redux/selectors/authSelector';
import NewReport from './NewReport';
import ReportForm from './ReportForm';
import ConnectionSidePanel from './ConnectionSidePanel';
import SidebarContainer from './SidebarContainer';
import {roles as appRoles} from '../utilities/constants';

import './../stylesheets/dashboardSidebar.scss';

const DashboardSidebar = () => {
  const {propertyGrid, isTileActive, mapMode, isEditingReportMode, openReportContent, areManageReportButtonsVisible} =
    useContext(MapContext);
  const authRoles = useSelector(selectLoggedInUserRoles);

  return (
    <SidebarContainer
      navigation={<MapPanel />}
      finishTileButton={<FinishTile />}
      isTileActive={isTileActive}
      userRoles={authRoles}
      appRoles={appRoles}>
      <>
        {mapMode === MapModes.view ? (
          propertyGrid ? (
            <PropertyGrid propertyGrid={propertyGrid} />
          ) : (
            <p>Click on stop or report pin to display details.</p>
          )
        ) : null}
        {mapMode === MapModes.report && <NewReport />}
        {isEditingReportMode && openReportContent && (
          <ReportForm areManageReportButtonsVisible={areManageReportButtonsVisible} />
        )}
        {mapMode === MapModes.connection && <ConnectionSidePanel />}
      </>
    </SidebarContainer>
  );
};

export default DashboardSidebar;
