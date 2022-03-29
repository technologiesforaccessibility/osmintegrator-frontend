import { Conversation, Stop } from 'api/apiClient';
// import api from 'api/apiInstance';
// import { UserContext } from 'components/contexts/UserContextProvider';
import { FC, useContext } from 'react';
import { Marker, Tooltip } from 'react-leaflet';
// import { exception } from 'utilities/exceptionHelper';
import { MapModes } from 'utilities/MapContextState';
import { getReportIcon } from 'utilities/utilities';

import { MapContext } from '../contexts/MapContextProvider';

type TImportedReportsProps = {
  reports: Conversation[];
  resetActiveStop: () => void;
};

const ImportedReports: FC<TImportedReportsProps> = ({ reports, resetActiveStop }) => {
  const {
    mapMode,
    newReportCoordinates,
    visibilityOptions,
    setNewReportCoordinates,
    setActiveStop,
    displayPropertyGrid,
  } = useContext(MapContext);
  // const { setLoader } = useContext(UserContext);

  // const updatePosition = async (data: { lat: number; lon: number; conversationId: string }) => {
  //   try {
  //     setLoader(true);
  //     await api.conversationChangePositionUpdate(data);
  //   } catch (error) {
  //     exception(error);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  const handleReportClick = (data: Stop | Conversation | null) => {
    displayPropertyGrid(data);
  };

  const isActive = (iconCord: any) => {
    return JSON.stringify(iconCord) === JSON.stringify(newReportCoordinates);
  };

  return (
    <>
      {reports.map(({ lat, lon, id, tileId, messages, status }, index) => {
        return (
          <Marker
            key={index}
            draggable={mapMode === MapModes.pan && isActive({ lat, lon })}
            position={[lat ?? 0, lon ?? 0]}
            icon={getReportIcon(status ?? 99, isActive({ lat, lon }))}
            pane="markerPane"
            shadowPane="tooltipPane"
            opacity={visibilityOptions.mapReport.value.opacityValue}
            zIndexOffset={isActive({ lat, lon }) ? 1000 : 0}
            eventHandlers={{
              click: () => {
                if (mapMode !== MapModes.connection) {
                  setNewReportCoordinates({ lat: lat ?? 0, lon: lon ?? 0 });
                  setActiveStop(null);
                  resetActiveStop();
                  if (isActive({ lat, lon }) && newReportCoordinates.lat && newReportCoordinates.lon) {
                    setNewReportCoordinates({ lat: null, lon: null });
                    handleReportClick(null);
                  } else {
                    handleReportClick({ lat, lon, id, tileId, messages });
                  }
                }
              },
            }}>
            <Tooltip direction="top" offset={[0, -55]}>
              {lat?.toString().slice(0, 6)} {lon?.toString().slice(0, 6)}
            </Tooltip>
          </Marker>
        );
      })}
    </>
  );
};

export default ImportedReports;
