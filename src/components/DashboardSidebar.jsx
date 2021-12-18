import {useContext} from 'react';
import {useSelector} from 'react-redux';

import PropertyGrid from './PropertyGrid';
import MapPanel from './MapPanel';
import FinishTile from './FinishTile';
import SyncPanel from './SyncPanel';
import {MapContext, MapModes} from './contexts/MapContextProvider';
import {selectLoggedInUserRoles} from '../redux/selectors/authSelector';
import NewReport from './NewReport';
import ReportForm from './ReportForm';
import ConnectionSidePanel from './ConnectionSidePanel';
import SidebarContainer from './SidebarContainer';
import SidebarConnectionHandler from './SidebarConnectionHandler';
import MovedStopHandler from './MovedStopHandler';
import {roles as appRoles} from '../utilities/constants';

import './../stylesheets/dashboardSidebar.scss';
import {useTranslation} from 'react-i18next';
import TileDetails from './TileDetails';

const DashboardSidebar = () => {
  const {
    propertyGrid,
    isTileActive,
    mapMode,
    isEditingReportMode,
    openReportContent,
    areManageReportButtonsVisible,
    isSidebarConnectionHandlerVisible,
    activeStop,
  } = useContext(MapContext);
  const authRoles = useSelector(selectLoggedInUserRoles);
  const {t} = useTranslation();

  return (
    <SidebarContainer
      navigation={<MapPanel />}
      finishTileButton={<FinishTile />}
      isTileActive={isTileActive}
      userRoles={authRoles}
      appRoles={appRoles}>
      <>
        {activeStop && isSidebarConnectionHandlerVisible && mapMode === MapModes.view && <SidebarConnectionHandler />}
        {activeStop && mapMode === MapModes.view && activeStop.stopType !== 0 && <MovedStopHandler />}
        {mapMode === MapModes.view ? (
          propertyGrid ? (
            <PropertyGrid propertyGrid={propertyGrid} />
          ) : (
            <p>{t('sidebar.viewPlaceholder')}</p>
          )
        ) : null}
        {mapMode === MapModes.report && <NewReport />}
        {isEditingReportMode && openReportContent && (
          <ReportForm areManageReportButtonsVisible={areManageReportButtonsVisible} />
        )}
        {mapMode === MapModes.connection && <ConnectionSidePanel />}
        {mapMode === MapModes.tile && <TileDetails />}
        {mapMode === MapModes.sync && <SyncPanel />}
      </>
    </SidebarContainer>
  );
};

export default DashboardSidebar;
