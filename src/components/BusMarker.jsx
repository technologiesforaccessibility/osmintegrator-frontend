import {Marker, Tooltip} from 'react-leaflet';

import {getBusStopIcon} from '../utilities/utilities';
import {generateStopName} from '../utilities/mapUtilities';
import {useContext, useMemo} from 'react';
import {MapContext} from './contexts/MapContextProvider';

const BusMarker = ({busStop, isConnectionMode, createConnection, isViewMode, isActiveStopClicked, clickBusStop}) => {
  const {visibilityOptions, connectedStopIds, approvedStopIds} = useContext(MapContext);
  const opacity = useMemo(() => {
    if (connectedStopIds.includes(busStop.id)) {
      return visibilityOptions.connected.value.opacityValue;
    }
    if (approvedStopIds.includes(busStop.id)) {
      return visibilityOptions.approved.value.opacityValue;
    }
    return visibilityOptions.unconnected.value.opacityValue;
  }, [visibilityOptions, busStop.id, connectedStopIds, approvedStopIds]);

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
            isActiveStopClicked(busStop.id) ? clickBusStop() : clickBusStop(busStop);
          }
        },
      }}>
      <Tooltip direction="bottom">{generateStopName(busStop.id, busStop.name || null, busStop.number || null)}</Tooltip>
    </Marker>
  );
};

export default BusMarker;
