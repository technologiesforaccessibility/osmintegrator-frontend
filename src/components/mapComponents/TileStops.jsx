import React, {Fragment} from 'react';
import {Marker, Tooltip} from "react-leaflet";

import {getBusStopIcon} from "../../utilities/utilities";


const TileStops = ({areStopsVisible, clickBusStop, createConnection, isActiveStopClicked, stops, unclickBusStop, isConnectionMode}) => {
    return (
        <Fragment>
            {areStopsVisible &&
                stops.map(busStop => (
                    <Marker
                        key={busStop.id}
                        position={[busStop.lat, busStop.lon]}
                        icon={getBusStopIcon(busStop)}
                        eventHandlers={{
                            click: e => {
                                if (isConnectionMode) {
                                    createConnection(e.target, busStop.id, busStop.stopType, busStop.name, busStop.number);
                                } else {
                                    isActiveStopClicked(busStop.id)
                                        ? clickBusStop()
                                        : clickBusStop(busStop);
                                }
                            },
                        }}>
                        <Tooltip direction="bottom">
                            {busStop.name ? `${busStop.name} ${busStop.number}` : `No stop name provided, identifier: ${busStop.id}`}
                        </Tooltip>
                    </Marker>
                ))}
        </Fragment>
    )
}

export default TileStops;