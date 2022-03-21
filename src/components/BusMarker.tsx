import { Stop } from 'api/apiClient';
import { FC, useContext, useMemo } from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import { ConnectionRadio, StopType } from 'types/enums';
import { TBusStopProperties } from 'types/stops';
import { generateStopName } from 'utilities/mapUtilities';
import { getBusStopIcon } from 'utilities/utilities';

import { MapContext } from './contexts/MapContextProvider';

type TBusMarkerProps = {
  busStop: Stop;
  isConnectionMode: boolean;
  createConnection: (stop: Stop) => void;
  isViewMode: boolean;
  isActiveStopClicked: (stopId: string) => boolean;
  clickBusStop: (stop?: Stop) => void;
  isReportMode: boolean;
};

const BusMarker: FC<TBusMarkerProps> = ({
  busStop,
  isConnectionMode,
  createConnection,
  isViewMode,
  isActiveStopClicked,
  clickBusStop,
  isReportMode,
}) => {
  const {
    visibilityOptions,
    connectedStopIds,
    setIsSidebarConnectionHandlerVisible,
    setConnectedStopPair,
    importedConnections,
    tileStops,
    setActiveStop,
    setNewReportCoordinates,
    connectionData,
    connectionRadio,
  } = useContext(MapContext);

  const opacity = useMemo(() => {
    if (connectedStopIds.includes(busStop.id ?? '')) {
      return visibilityOptions.connected.value.opacityValue;
    }
    return visibilityOptions.unconnected.value.opacityValue;
  }, [visibilityOptions, busStop.id, connectedStopIds]);

  const handleViewModeStopClick = (stop: Stop) => {
    clickBusStop(stop);
    if (connectedStopIds.includes(stop.id ?? '')) {
      const connection =
        stop.stopType === StopType.OSM
          ? importedConnections.find(conn => conn.osmStopId === stop.id)
          : importedConnections.find(conn => conn.gtfsStopId === stop.id);
      if (stop.stopType === StopType.OSM) {
        const gtfsStop = tileStops.find(tileStop => tileStop.id === connection?.gtfsStopId);
        setConnectedStopPair({
          markedStop: stop,
          connectedStop: gtfsStop,
          connection: { id: connection?.id },
        });
      } else {
        const osmStop = tileStops.find(tileStop => tileStop.id === connection?.osmStopId);
        setConnectedStopPair({
          markedStop: stop,
          connectedStop: osmStop,
          connection: { id: connection?.id },
        });
      }
      setIsSidebarConnectionHandlerVisible(true);
    } else {
      setIsSidebarConnectionHandlerVisible(false);
      setConnectedStopPair({ markedStop: null, connectedStop: null, connection: null });
    }
  };

  const handleViewModeStopUnclick = () => {
    clickBusStop();
    setIsSidebarConnectionHandlerVisible(false);
    setConnectedStopPair({ markedStop: null, connectedStop: null, connection: null });
  };

  const getIcon = (stop: Stop) => {
    if (isViewMode || isReportMode) {
      return getBusStopIcon(stop as TBusStopProperties, isActiveStopClicked(stop.id ?? ''));
    } else if (isConnectionMode) {
      const activeStopWithConnection = connectionData.filter(connection => connection.id === stop.id);
      return activeStopWithConnection.length > 0
        ? getBusStopIcon(stop as TBusStopProperties, true)
        : getBusStopIcon(stop as TBusStopProperties, false);
    } else {
      return getBusStopIcon(stop as TBusStopProperties, false);
    }
  };

  return (
    <Marker
      key={busStop.id}
      position={[busStop.lat ?? 0, busStop.lon ?? 0]}
      icon={getIcon(busStop)}
      riseOnHover={true}
      opacity={opacity}
      pane="shadowPane"
      shadowPane="markerPane"
      zIndexOffset={isActiveStopClicked(busStop.id ?? '') ? 1000 : 0}
      eventHandlers={{
        click: () => {
          setActiveStop(busStop);
          setNewReportCoordinates({ lat: null, lon: null });
          if (isConnectionMode) {
            if (connectionRadio === ConnectionRadio.ADD) {
              createConnection(busStop);
            } else if (connectionRadio === ConnectionRadio.EDIT) {
              if (isActiveStopClicked(busStop.id ?? '')) {
                handleViewModeStopUnclick();
              } else {
                handleViewModeStopClick(busStop);
              }
            }
          } else if (isViewMode || isReportMode) {
            if (isActiveStopClicked(busStop.id ?? '')) {
              clickBusStop();
            } else {
              clickBusStop(busStop);
            }
          }
        },
      }}>
      <Tooltip direction="bottom">{generateStopName(busStop)}</Tooltip>
    </Marker>
  );
};

export default BusMarker;
