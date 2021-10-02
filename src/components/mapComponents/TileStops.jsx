import {connectionVisibilityProps} from '../../utilities/constants';
import BusMarker from '../BusMarker';

const TileStops = ({
  areStopsVisible,
  clickBusStop,
  createConnection,
  isActiveStopClicked,
  stops,
  isConnectionMode,
  isViewMode,
  connectionVisibility,
  connectedStopIds,
}) => {
  const stopsToRender = () => {
    return connectionVisibility === connectionVisibilityProps.hidden
      ? stops.filter(stop => !connectedStopIds.includes(stop.id))
      : stops;
  };

  return (
    <>
      {areStopsVisible &&
        stopsToRender().map(busStop => (
          <BusMarker
            busStop={busStop}
            connectedStopIds={connectedStopIds}
            connectionVisibility={connectionVisibility}
            isConnectionMode={isConnectionMode}
            createConnection={createConnection}
            isViewMode={isViewMode}
            isActiveStopClicked={isActiveStopClicked}
            clickBusStop={clickBusStop}
          />
        ))}
    </>
  );
};

export default TileStops;
