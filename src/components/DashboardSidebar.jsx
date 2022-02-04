import {useContext} from 'react';
import {useSelector} from 'react-redux';

import PropertyGrid from './PropertyGrid';
import MapPanel from './MapPanel';
import SyncPanel from './SyncPanel';
import {MapContext, MapModes} from './contexts/MapContextProvider';
import {selectLoggedInUserRoles} from '../redux/selectors/authSelector';
import NewReport from './NewReport';
import ConnectionSidePanel from './ConnectionSidePanel';
import SidebarContainer from './SidebarContainer';
import SidebarConnectionHandler from './SidebarConnectionHandler';
import {roles as appRoles} from '../utilities/constants';

import './../stylesheets/dashboardSidebar.scss';
import {useTranslation} from 'react-i18next';
import TileDetails from './TileDetails';
import ConnectionRadioGroup from './ConnectionRadioGroup';
import {ConnectionRadio} from '../types/enums';

const DashboardSidebar = () => {
  const {propertyGrid, isTileActive, mapMode, connectionRadio} = useContext(MapContext);
  const authRoles = useSelector(selectLoggedInUserRoles);
  const {t} = useTranslation();

  return (
    <SidebarContainer navigation={<MapPanel />} isTileActive={isTileActive} userRoles={authRoles} appRoles={appRoles}>
      <>
        {mapMode === MapModes.view ? (
          propertyGrid ? (
            <PropertyGrid propertyGrid={propertyGrid} />
          ) : (
            <p>{t('sidebar.viewPlaceholder')}</p>
          )
        ) : null}
        {mapMode === MapModes.report && <NewReport />}
        {mapMode === MapModes.connection && <ConnectionRadioGroup />}
        {mapMode === MapModes.connection && connectionRadio === ConnectionRadio.ADD && <ConnectionSidePanel />}
        {mapMode === MapModes.connection && connectionRadio === ConnectionRadio.EDIT && <SidebarConnectionHandler />}
        {mapMode === MapModes.tile && <TileDetails />}
        {mapMode === MapModes.sync && <SyncPanel />}
      </>
    </SidebarContainer>
  );
};

export default DashboardSidebar;
