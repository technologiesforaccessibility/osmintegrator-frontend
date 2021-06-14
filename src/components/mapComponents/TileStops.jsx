import React, {Fragment} from 'react';
import {Marker, Tooltip} from 'react-leaflet';

import {getBusStopIcon} from '../../utilities/utilities';
import {generateStopName} from '../../utilities/mapUtilities';

const TileStops = ({
  areStopsVisible,
  clickBusStop,
  createConnection,
  isActiveStopClicked,
  stops,
  isConnectionMode,
  isViewMode,
}) => {
  return (
    <Fragment>
      {areStopsVisible &&
        stops.map(busStop => (
          <Marker
            key={busStop.id}
            position={[busStop.lat, busStop.lon]}
            icon={getBusStopIcon(busStop)}
            eventHandlers={{
              click: () => {
                if (isConnectionMode) {
                  createConnection(
                    [busStop.lat, busStop.lon],
                    busStop.id,
                    busStop.stopType,
                    busStop.name,
                    busStop.number,
                  );
                } else if (isViewMode) {
                  isActiveStopClicked(busStop.id) ? clickBusStop() : clickBusStop(busStop);
                }
              },
            }}>
            <Tooltip direction="bottom">
              {generateStopName(busStop.id, busStop.name || null, busStop.number || null)}
            </Tooltip>
          </Marker>
        ))}
    </Fragment>
  );
};

export default TileStops;
