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
    movedStopsDispatch,
    markerReference,
    setMarkerReference,
    setResetPositionFunction,
  } = useContext(MapContext);
  const markerRef = useRef(null);
  const {lat, lon, id, name, number, stopId, stopType} = busStop;
  const originalCoordinates = useMemo(() => {
    return [lat, lon];
  }, [lat, lon]);
  const [position, setPosition] = useState(originalCoordinates);

  const opacity = useMemo(() => {
    if (connectedStopIds.includes(id)) {
      return visibilityOptions.connected.value.opacityValue;
    }
    if (approvedStopIds.includes(id)) {
      return visibilityOptions.approved.value.opacityValue;
    }
    return visibilityOptions.unconnected.value.opacityValue;
  }, [visibilityOptions, id, connectedStopIds, approvedStopIds]);

  const handleViewModeStopClick = () => {
    clickBusStop(busStop);
    if (connectedStopIds.includes(id) || approvedStopIds.includes(id)) {
      const connection =
        stopType === 0
          ? importedConnections.find(stop => stop.osmStopId === id)
          : importedConnections.find(stop => stop.gtfsStopId === id);
      if (stopType === 0) {
        const gtfsStop = tileStops.find(stop => stop.id === connection.gtfsStopId);
        setConnectedStopPair({
          markedStop: {name: name || null, id, isOsm: true},
          connectedStop: {name: gtfsStop.name || null, id: gtfsStop.id, isOsm: false},
          connection: {id: connection.id, approved: connection.approved},
        });
      } else {
        setConnectedStopPair({
          markedStop: {name: name || null, id, isOsm: false},
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

  const getIcon = () => {
    if (isViewMode || isReportMode) {
      return getBusStopIcon(busStop, isActiveStopClicked(id));
    } else if (isConnectionMode) {
      const activeStopWithConnection = connectionData.filter(connection => connection.id === id);
      return activeStopWithConnection.length > 0 ? getBusStopIcon(busStop, true) : getBusStopIcon(busStop, false);
    } else {
      return getBusStopIcon(busStop, false);
    }
  };

  return (
    <Marker
      key={id}
      draggable={stopType === 0 ? false : !!(draggableStopId === id)}
      ref={markerRef}
      position={position}
      icon={getIcon(busStop)}
      riseOnHover={true}
      opacity={opacity}
      pane="shadowPane"
      shadowPane="markerPane"
      zIndexOffset={isActiveStopClicked(id) ? 1000 : 0}
      eventHandlers={{
        click: () => {
          setActiveStop(busStop);
          setNewReportCoordinates({lat: null, lon: null});
          if (isConnectionMode) {
            isActiveStopClicked(id) ? clickBusStop() : clickBusStop(busStop);
            createConnection([lat, lon], id, stopType, name, number);
          } else if (isViewMode || isReportMode) {
            isActiveStopClicked(id) ? handleViewModeStopUnclick() : handleViewModeStopClick(busStop);
          }
        },
        dblclick: () => {
          draggableStopId === id
            ? setResetPositionFunction(null)
            : setResetPositionFunction(() => () => setPosition(originalCoordinates));
          setDraggableStopId(draggableStopId === id ? null : id);
          setMarkerReference(markerReference === markerRef.current ? null : markerRef.current);
        },
        dragend: () => {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
          }
          console.log(markerRef.current);
          movedStopsDispatch({
            type: MovedStopsReducerActionKind.ADD,
            payload: {id, externalId: stopId, position: marker.getLatLng()},
          });
        },
      }}>
      <Tooltip direction="bottom">{generateStopName(id, name || null, number || null)}</Tooltip>
    </Marker>
  );
};

export default BusMarker;
