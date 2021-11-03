import {useContext, useMemo} from 'react';
import BusMarker from '../BusMarker';
import {MapContext} from '../contexts/MapContextProvider';

const TileStops = ({
  clickBusStop,
  createConnection,
  isActiveStopClicked,
  stops,
  isConnectionMode,
  isViewMode,
  isReportMode,
}) => {
  const {areStopsVisible, connectedStopIds, approvedStopIds, visibilityOptions} = useContext(MapContext);

  const stopsToRender = useMemo(
    () =>
      stops.filter(stop => {
        if (!visibilityOptions.connected.value.opacityValue) {
          if (connectedStopIds.includes(stop.id)) {
            return false;
          }
        }
        if (!visibilityOptions.approved.value.opacityValue) {
          if (approvedStopIds.includes(stop.id)) {
            return false;
          }
        }
        if (!visibilityOptions.unconnected.value.opacityValue) {
          if (!connectedStopIds.includes(stop.id) && !approvedStopIds.includes(stop.id)) {
            return false;
          }
        }
        return true;
      }),
    [stops, visibilityOptions, connectedStopIds, approvedStopIds],
  );

  return (
    <>
      {areStopsVisible &&
        stopsToRender.map((busStop, index) => (
          <BusMarker
            busStop={busStop}
            isConnectionMode={isConnectionMode}
            isReportMode={isReportMode}
            createConnection={createConnection}
            isViewMode={isViewMode}
            isActiveStopClicked={isActiveStopClicked}
            clickBusStop={clickBusStop}
            key={`bust_stop_${index}`}
          />
        ))}
    </>
  );
};

export default TileStops;
