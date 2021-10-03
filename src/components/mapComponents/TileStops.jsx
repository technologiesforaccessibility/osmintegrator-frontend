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
  connectedStopIds,
}) => {
  const stopsToRender = () => {
    const stopsAfterVisibilityFilter =
      connectedStopVisibility === connectedStopVisibilityProps.hidden
        ? stops.filter(stop => !connectedStopIds.includes(stop.id))
        : stops;

    const stopsWithoutOSMOutsideTile = stopsAfterVisibilityFilter.filter(
      stop => !(stop.stopType === 0 && stop.outsideSelectedTile),
    );

    return stopsWithoutOSMOutsideTile;
  };

  return (
    <>
      {areStopsVisible &&
        stopsToRender().map(busStop => (
          <BusMarker
            busStop={busStop}
            connectedStopIds={connectedStopIds}
            connectedStopVisibility={connectedStopVisibility}
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
