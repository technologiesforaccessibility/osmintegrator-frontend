import {Marker, Tooltip} from 'react-leaflet';

import {getBusStopIcon} from '../utilities/utilities';
import {generateStopName} from '../utilities/mapUtilities';
import {useContext, useMemo} from 'react';
import {MapContext} from './contexts/MapContextProvider';

const BusMarker = ({
  busStop,
  isConnectionMode,
  isReportMode,
  createConnection,
  isViewMode,
  isActiveStopClicked,
  clickBusStop,
}) => {
  const {visibilityOptions, connectedStopIds, approvedStopIds, setActiveStop} = useContext(MapContext);
  const opacity = useMemo(() => {
    if (connectedStopIds.includes(busStop.id)) {
      return visibilityOptions.connected.value.opacityValue;
    }
    if (approvedStopIds.includes(busStop.id)) {
      return visibilityOptions.approved.value.opacityValue;
    }
    return visibilityOptions.unconnected.value.opacityValue;
  }, [visibilityOptions, busStop.id, connectedStopIds, approvedStopIds]);

  const getIcon = () => {
    if (isViewMode || isReportMode) {
      return getBusStopIcon(busStop, isActiveStopClicked(busStop.id));
    } else {
      return getBusStopIcon(busStop, false);
    }
  };

  return (
    <Marker
      key={busStop.id}
      position={[busStop.lat, busStop.lon]}
      icon={getIcon()}
      riseOnHover={true}
      opacity={opacity}
      shadowPane="tooltipPane"
      zIndexOffset={isActiveStopClicked(busStop.id) ? 1000 : 0}
      eventHandlers={{
        click: () => {
          setActiveStop(busStop);
          if (isConnectionMode) {
            isActiveStopClicked(busStop.id) ? clickBusStop() : clickBusStop(busStop);
            createConnection([busStop.lat, busStop.lon], busStop.id, busStop.stopType, busStop.name, busStop.number);
          } else if (isViewMode || isReportMode) {
            isActiveStopClicked(busStop.id) ? clickBusStop() : clickBusStop(busStop);
          }
        },
      }}>
      <Tooltip direction="bottom">{generateStopName(busStop.id, busStop.name || null, busStop.number || null)}</Tooltip>
    </Marker>
  );
};

export default BusMarker;
