import { useContext } from 'react';

import PropertyGrid from './PropertyGrid';
import MapPanel from './MapPanel';
import SyncPanel from './SyncPanel';
import { MapContext, MapModes } from './contexts/MapContextProvider';
import NewReport from './NewReport';
import ConnectionSidePanel from './ConnectionSidePanel';
import SidebarContainer from './SidebarContainer';
import SidebarConnectionHandler from './SidebarConnectionHandler';

import './../stylesheets/dashboardSidebar.scss';
import { useTranslation } from 'react-i18next';
import TileDetails from './TileDetails';
import ConnectionRadioGroup from './ConnectionRadioGroup';
import { ConnectionRadio } from '../types/enums';

const DashboardSidebar = () => {
  const { propertyGrid, mapMode, connectionRadio } = useContext(MapContext);
  const { t } = useTranslation();

  return (
    <SidebarContainer navigation={<MapPanel />}>
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
