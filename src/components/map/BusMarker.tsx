import { Stop } from 'api/apiClient';
import { FC, useContext, useMemo, useRef, useState } from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import { ConnectionRadio, StopType } from 'types/enums';
import { TBusStopProperties } from 'types/stops';
import { MapModes } from 'utilities/MapContextState';
import { generateStopName } from 'utilities/mapUtilities';
import { getBusStopIcon } from 'utilities/utilities';

import { MapContext } from '../contexts/MapContextProvider';

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

    draggableStopId,
    // setDraggableStopId,
    // movedStopsDispatch,
    // markerReference,
    // setMarkerReference,
    // setResetPositionFunction,
    mapMode,
  } = useContext(MapContext);

  const markerRef = useRef(null);
  const { lat, lon, id } = busStop;

  const originalCoordinates: [number, number] = useMemo(() => [lat ?? 0, lon ?? 0], [lat, lon]);
  const [markerPosition] = useState<[number, number]>(originalCoordinates);

  const opacity = useMemo(() => {
    if (connectedStopIds.includes(id ?? '')) {
      return visibilityOptions.connected.value.opacityValue;
    }
    return visibilityOptions.unconnected.value.opacityValue;
  }, [visibilityOptions, id, connectedStopIds]);

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

  const checkIfDraggable = (stop: Stop) => {
    if (stop.stopType !== StopType.GTFS) return false;

    return mapMode === MapModes.pan && draggableStopId === stop.id;
  };

  const handleClick = () => {
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
  };

  // const handleDragEnd = () => {
  //   const currentMarker: typeof Marker | null = markerRef.current;
  //   if (!!currentMarker) setMarkerPosition(currentMarker.getLatLng());
  // };

  return (
    <Marker
      key={busStop.id}
      ref={markerRef}
      draggable={checkIfDraggable(busStop)}
      position={markerPosition}
      icon={getIcon(busStop)}
      riseOnHover={true}
      opacity={opacity}
      pane="shadowPane"
      shadowPane="markerPane"
      zIndexOffset={isActiveStopClicked(busStop.id ?? '') ? 1000 : 0}
      eventHandlers={{
        click: handleClick,
      }}>
      <Tooltip direction="bottom">{generateStopName(busStop)}</Tooltip>
    </Marker>
  );
};

export default BusMarker;
