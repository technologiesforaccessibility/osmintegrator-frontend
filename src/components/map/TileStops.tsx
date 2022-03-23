import { Stop } from 'api/apiClient';
import { FC, useContext, useMemo } from 'react';

import { MapContext } from '../contexts/MapContextProvider';
import BusMarker from './BusMarker';

type TTileStopsProps = {
  clickBusStop: (stop?: Stop) => void;
  createConnection: (stop: Stop) => void;
  isActiveStopClicked: (stopId: string) => boolean;
  isConnectionMode: boolean;
  isViewMode: boolean;
  isReportMode: boolean;
  isPanMode: boolean;
};

const TileStops: FC<TTileStopsProps> = ({
  clickBusStop,
  createConnection,
  isActiveStopClicked,
  isConnectionMode,
  isViewMode,
  isReportMode,
  isPanMode,
}) => {
  const { areStopsVisible, connectedStopIds, visibilityOptions, tileStops: stops } = useContext(MapContext);

  const stopsToRender = useMemo(
    () =>
      stops.filter(stop => {
        if (!visibilityOptions.connected.value.opacityValue) {
          if (connectedStopIds.includes(stop.id ?? '')) {
            return false;
          }
        }
        if (!visibilityOptions.unconnected.value.opacityValue) {
          if (!connectedStopIds.includes(stop.id ?? '')) {
            return false;
          }
        }
        return true;
      }),
    [stops, visibilityOptions, connectedStopIds],
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
            isPanMode={isPanMode}
            isActiveStopClicked={isActiveStopClicked}
            clickBusStop={clickBusStop}
            key={`bust_stop_${index}`}
          />
        ))}
    </>
  );
};

export default TileStops;
