import {Marker, Tooltip} from 'react-leaflet';

import {getBusStopIcon} from '../utilities/utilities';
import {generateStopName} from '../utilities/mapUtilities';
import {connectedStopVisibilityProps} from '../utilities/constants';
import {useMemo} from 'react';

const BusMarker = ({
  busStop,
  connectedStopIds,
  connectedStopVisibility,
  unconnectedStopVisibility,
  isConnectionMode,
  createConnection,
  isViewMode,
  isActiveStopClicked,
  clickBusStop,
}) => {
  const opacity = useMemo(
    () =>
      connectedStopIds.includes(busStop.id)
        ? connectedStopVisibility === connectedStopVisibilityProps.semiTransparent
          ? 0.5
          : 1
        : unconnectedStopVisibility === connectedStopVisibilityProps.semiTransparent
        ? 0.5
        : 1,
    [connectedStopVisibility, unconnectedStopVisibility, busStop.id, connectedStopIds],
  );

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
