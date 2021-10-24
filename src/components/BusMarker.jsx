import {Marker, Tooltip} from 'react-leaflet';

import {getBusStopIcon} from '../utilities/utilities';
import {generateStopName} from '../utilities/mapUtilities';
import {useContext, useMemo} from 'react';
import {MapContext} from './contexts/MapContextProvider';

const BusMarker = ({busStop, isConnectionMode, createConnection, isViewMode, isActiveStopClicked, clickBusStop}) => {
  const {
    visibilityOptions,
    connectedStopIds,
    approvedStopIds,
    setIsSidebarConnectionHandlerVisible,
    setConnectedStopPair,
    importedConnections,
    tileStops,
  } = useContext(MapContext);
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
    if (connectedStopIds.includes(busStop.id)) {
      const connection =
        busStop.stopType === 0
          ? importedConnections.find(stop => stop.osmStopId === busStop.id)
          : importedConnections.find(stop => stop.gtfsStopId === busStop.id);
      if (busStop.stopType === 0) {
        const gtfsStop = tileStops.find(stop => stop.id === connection.gtfsStopId);
        setConnectedStopPair({
          markedStop: {name: busStop.name || null, id: busStop.id, isOsm: true},
          connectedStop: {name: gtfsStop.name || null, id: gtfsStop.id, isOsm: false},
          connectionId: connection.id,
        });
      } else {
        setConnectedStopPair({
          markedStop: {name: busStop.name || null, id: busStop.id, isOsm: false},
          connectedStop: {name: connection.osmStop.name || null, id: connection.osmStop.id, isOsm: true},
          connectionId: connection.id,
        });
      }
      setIsSidebarConnectionHandlerVisible(true);
    }
  };

  const handleViewModeStopUnclick = () => {
    clickBusStop();
    setIsSidebarConnectionHandlerVisible(false);
    setConnectedStopPair({markedStop: null, connectedStop: null});
  };

  return (
    <Marker
      key={busStop.id}
      position={[busStop.lat, busStop.lon]}
      icon={getBusStopIcon(busStop)}
      riseOnHover={true}
      opacity={opacity}
      eventHandlers={{
        click: () => {
          if (isConnectionMode) {
            createConnection([busStop.lat, busStop.lon], busStop.id, busStop.stopType, busStop.name, busStop.number);
          } else if (isViewMode) {
            isActiveStopClicked(busStop.id) ? handleViewModeStopUnclick() : handleViewModeStopClick(busStop);
          }
        },
      }}>
      <Tooltip direction="bottom">{generateStopName(busStop.id, busStop.name || null, busStop.number || null)}</Tooltip>
    </Marker>
  );
};

export default BusMarker;
