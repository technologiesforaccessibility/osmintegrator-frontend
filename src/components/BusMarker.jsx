import {useContext, useMemo} from 'react';
import {Marker, Tooltip} from 'react-leaflet';

import {getBusStopIcon} from '../utilities/utilities';
import {generateStopName} from '../utilities/mapUtilities';
import {MapContext} from './contexts/MapContextProvider';
import {ConnectionRadio, StopType} from '../types/enums';

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
    if (connectedStopIds.includes(busStop.id)) {
      return visibilityOptions.connected.value.opacityValue;
    }
    return visibilityOptions.unconnected.value.opacityValue;
  }, [visibilityOptions, busStop.id, connectedStopIds]);

  const handleViewModeStopClick = busStop => {
    clickBusStop(busStop);
    if (connectedStopIds.includes(busStop.id)) {
      const connection =
        busStop.stopType === StopType.OSM
          ? importedConnections.find(stop => stop.osmStopId === busStop.id)
          : importedConnections.find(stop => stop.gtfsStopId === busStop.id);
      if (busStop.stopType === StopType.OSM) {
        const gtfsStop = tileStops.find(stop => stop.id === connection.gtfsStopId);
        setConnectedStopPair({
          markedStop: busStop,
          connectedStop: gtfsStop,
          connection: {id: connection.id},
        });
      } else {
        setConnectedStopPair({
          markedStop: busStop,
          connectedStop: connection.osmStop,
          connection: {id: connection.id},
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
      position={[busStop.lat, busStop.lon]}
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
            if (connectionRadio === ConnectionRadio.ADD) {
              createConnection([busStop.lat, busStop.lon], busStop.id, busStop.stopType, busStop.name, busStop.number);
            } else if (connectionRadio === ConnectionRadio.EDIT) {
              isActiveStopClicked(busStop.id) ? handleViewModeStopUnclick() : handleViewModeStopClick(busStop);
            }
          } else if (isViewMode || isReportMode) {
            isActiveStopClicked(busStop.id) ? clickBusStop() : clickBusStop(busStop);
          }
        },
      }}>
      <Tooltip direction="bottom">{generateStopName(busStop)}</Tooltip>
    </Marker>
  );
};

export default BusMarker;
