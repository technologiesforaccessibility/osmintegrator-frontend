import './dashboardSidebar.scss';

import PositionChangePanel from 'components/map/PositionChangePanel/PositionChangePanel';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ConnectionRadio } from 'types/enums';
import { MapModes } from 'utilities/MapContextState';

import ConnectionRadioGroup from '../../connections/ConnectionRadioGroup';
import ConnectionSidePanel from '../../connections/ConnectionSidePanel/ConnectionSidePanel';
import { MapContext } from '../../contexts/MapContextProvider';
import SidebarConnectionHandler from '../../extra/SidebarConnectionHandler/SidebarConnectionHandler';
import SidebarContainer from '../../extra/SidebarContainer';
import MapPanel from '../../map/Panel/MapPanel';
import SyncPanel from '../../map/SyncPanel/SyncPanel';
import ViewPanel from '../../property/PropertyGrid/ViewPanel';
import NewReport from '../../reports/NewReport/NewReport';
import TileDetails from '../../tiles/TileDetails/TileDetails';

const DashboardSidebar = () => {
  const { propertyGrid, mapMode, connectionRadio } = useContext(MapContext);
  const { t } = useTranslation();

  return (
    <SidebarContainer navigation={<MapPanel />}>
      <>
        {mapMode === MapModes.view ? (
          propertyGrid ? (
            <ViewPanel propertyGrid={propertyGrid} />
          ) : (
            <p>{t('sidebar.viewPlaceholder')}</p>
          )
        ) : null}
        {mapMode === MapModes.report && <NewReport />}
        {mapMode === MapModes.pan && <PositionChangePanel />}
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
