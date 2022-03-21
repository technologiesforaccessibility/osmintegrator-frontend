import 'stylesheets/dashboardSidebar.scss';

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ConnectionRadio } from 'types/enums';

import ConnectionRadioGroup from './ConnectionRadioGroup';
import ConnectionSidePanel from './ConnectionSidePanel';
import { MapContext, MapModes } from './contexts/MapContextProvider';
import MapPanel from './MapPanel';
import NewReport from './NewReport';
import PropertyGrid from './PropertyGrid';
import SidebarConnectionHandler from './SidebarConnectionHandler';
import SidebarContainer from './SidebarContainer';
import SyncPanel from './SyncPanel';
import TileDetails from './TileDetails';

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
