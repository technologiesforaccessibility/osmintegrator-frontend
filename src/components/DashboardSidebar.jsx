import {useContext} from 'react';
import {useSelector} from 'react-redux';

import PropertyGrid from './PropertyGrid';
import MapPanel from './MapPanel';
import FinishTile from './FinishTile';
import {MapContext} from './contexts/MapContextProvider';
import {selectLoggedInUserRoles} from '../redux/selectors/authSelector';
import NewReport from './NewReport';
import ReportForm from './ReportForm';
import ConnectionSidePanel from './ConnectionSidePanel';
import SidebarContainer from './SidebarContainer';
import {roles as appRoles} from '../utilities/constants';

import './../stylesheets/dashboardSidebar.scss';

const DashboardSidebar = () => {
  const {
    propertyGrid,
    isTileActive,
    isViewMode,
    isCreateReportMapMode,
    isConnectionMode,
    isEditingReportMode,
    openReportContent,
    areManageReportButtonsVisible,
  } = useContext(MapContext);
  const authRoles = useSelector(selectLoggedInUserRoles);

  return (
    <SidebarContainer
      navigation={<MapPanel />}
      finishTileButton={<FinishTile />}
      isTileActive={isTileActive}
      userRoles={authRoles}
      appRoles={appRoles}>
      <>
        {propertyGrid && isViewMode && <PropertyGrid propertyGrid={propertyGrid} />}
        {isCreateReportMapMode && <NewReport />}
        {isEditingReportMode && openReportContent && (
          <ReportForm areManageReportButtonsVisible={areManageReportButtonsVisible} />
        )}
        {isConnectionMode && <ConnectionSidePanel />}
      </>
    </SidebarContainer>
  );
};

export default DashboardSidebar;
