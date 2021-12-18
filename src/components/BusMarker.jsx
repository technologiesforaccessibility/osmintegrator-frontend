import {useContext, useMemo, useState, useRef} from 'react';
import {Marker, Tooltip} from 'react-leaflet';

import {getBusStopIcon} from '../utilities/utilities';
import {generateStopName} from '../utilities/mapUtilities';
import {MapContext} from './contexts/MapContextProvider';
import {MovedStopsReducerActionKind} from '../types/interfaces';

const BusMarker = ({
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
    approvedStopIds,
    setIsSidebarConnectionHandlerVisible,
    setConnectedStopPair,
    importedConnections,
    tileStops,
    setActiveStop,
    setNewReportCoordinates,
    connectionData,
    draggableStopId,
    setDraggableStopId,
    movedStopsState,
    movedStopsDispatch,
  } = useContext(MapContext);
  const markerRef = useRef(null);
  const [position, setPosition] = useState([busStop.lat, busStop.lon]);

  const opacity = useMemo(() => {
    if (connectedStopIds.includes(busStop.id)) {
      return visibilityOptions.connected.value.opacityValue;
    }
    if (approvedStopIds.includes(busStop.id)) {
      return visibilityOptions.approved.value.opacityValue;
    }
    return visibilityOptions.unconnected.value.opacityValue;
  }, [visibilityOptions, busStop.id, connectedStopIds, approvedStopIds]);

  const handleViewModeStopClick = busStop => {
    clickBusStop(busStop);
    if (connectedStopIds.includes(busStop.id) || approvedStopIds.includes(busStop.id)) {
      const connection =
        busStop.stopType === 0
          ? importedConnections.find(stop => stop.osmStopId === busStop.id)
          : importedConnections.find(stop => stop.gtfsStopId === busStop.id);
      if (busStop.stopType === 0) {
        const gtfsStop = tileStops.find(stop => stop.id === connection.gtfsStopId);
        setConnectedStopPair({
          markedStop: {name: busStop.name || null, id: busStop.id, isOsm: true},
          connectedStop: {name: gtfsStop.name || null, id: gtfsStop.id, isOsm: false},
          connection: {id: connection.id, approved: connection.approved},
        });
      } else {
        setConnectedStopPair({
          markedStop: {name: busStop.name || null, id: busStop.id, isOsm: false},
          connectedStop: {name: connection.osmStop.name || null, id: connection.osmStop.id, isOsm: true},
          connection: {id: connection.id, approved: connection.approved},
        });
      }
      setIsSidebarConnectionHandlerVisible(true);
    } else {
      setIsSidebarConnectionHandlerVisible(false);
      setConnectedStopPair({markedStop: null, connectedStop: null, connection: null});
    }
  };

  const handleViewModeStopUnclick = () => {
    clickBusStop();
    setIsSidebarConnectionHandlerVisible(false);
    setConnectedStopPair({markedStop: null, connectedStop: null, connection: null});
  };

  const getIcon = busStop => {
    if (isViewMode || isReportMode) {
      return getBusStopIcon(busStop, isActiveStopClicked(busStop.id));
    } else if (isConnectionMode) {
      const activeStopWithConnection = connectionData.filter(connection => connection.id === busStop.id);
      return activeStopWithConnection.length > 0 ? getBusStopIcon(busStop, true) : getBusStopIcon(busStop, false);
    } else {
      return getBusStopIcon(busStop, false);
    }
  };

  return (
    <Marker
      key={busStop.id}
      draggable={busStop.stopType === 0 ? false : !!(draggableStopId === busStop.id)}
      ref={markerRef}
      position={position}
      icon={getIcon(busStop)}
      riseOnHover={true}
      opacity={opacity}
      pane="shadowPane"
      shadowPane="markerPane"
      zIndexOffset={isActiveStopClicked(busStop.id) ? 1000 : 0}
      eventHandlers={{
        click: () => {
          setActiveStop(busStop);
          setNewReportCoordinates({lat: null, lon: null});
          if (isConnectionMode) {
            isActiveStopClicked(busStop.id) ? clickBusStop() : clickBusStop(busStop);
            createConnection([busStop.lat, busStop.lon], busStop.id, busStop.stopType, busStop.name, busStop.number);
          } else if (isViewMode || isReportMode) {
            isActiveStopClicked(busStop.id) ? handleViewModeStopUnclick() : handleViewModeStopClick(busStop);
          }
        },
        dblclick: () => {
          setDraggableStopId(draggableStopId === busStop.id ? null : busStop.id);
        },
        dragend: () => {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
          }
          movedStopsDispatch({
            type: MovedStopsReducerActionKind.ADD,
            payload: {id: busStop.id, externalId: busStop.stopId, position: marker.getLatLng()},
          });
        },
      }}>
      <Tooltip direction="bottom">{generateStopName(busStop.id, busStop.name || null, busStop.number || null)}</Tooltip>
    </Marker>
  );
};

export default BusMarker;
