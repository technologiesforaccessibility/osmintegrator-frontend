import {connectedStopVisibilityProps} from '../../utilities/constants';
import BusMarker from '../BusMarker';

const TileStops = ({
  areStopsVisible,
  clickBusStop,
  createConnection,
  isActiveStopClicked,
  stops,
  isConnectionMode,
  isViewMode,
  connectedStopVisibility,
  unconnectedStopVisibility,
  connectedStopIds,
}) => {
  const stopsToRender = () => {
    const stopsAfterVisibilityFilter =
      connectedStopVisibility === connectedStopVisibilityProps.hidden &&
      unconnectedStopVisibility === connectedStopVisibilityProps.hidden
        ? []
        : connectedStopVisibility === connectedStopVisibilityProps.hidden
        ? stops.filter(stop => !connectedStopIds.includes(stop.id))
        : unconnectedStopVisibility === connectedStopVisibilityProps.hidden
        ? stops.filter(stop => connectedStopIds.includes(stop.id))
        : stops;

    const stopsWithoutOSMOutsideTile = stopsAfterVisibilityFilter.filter(
      stop => !(stop.stopType === 0 && stop.outsideSelectedTile),
    );

    return stopsWithoutOSMOutsideTile;
  };

  return (
    <>
      {areStopsVisible &&
        stopsToRender().map((busStop, index) => (
          <BusMarker
            busStop={busStop}
            connectedStopIds={connectedStopIds}
            connectedStopVisibility={connectedStopVisibility}
            unconnectedStopVisibility={unconnectedStopVisibility}
            isConnectionMode={isConnectionMode}
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
