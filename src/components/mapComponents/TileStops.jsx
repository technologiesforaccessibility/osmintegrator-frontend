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
                                    console.log(busStop);
                                    createConnection(e.target, busStop.id, busStop.stopType, busStop.name, busStop.number);
                                } else {
                                    isActiveStopClicked(busStop.id)
                                        ? unclickBusStop()
                                        : clickBusStop(busStop);
                                }
                            },
                        }}>
                        <Tooltip direction="bottom">
                            {busStop.name} {busStop.number}
                        </Tooltip>
                    </Marker>
                ))}
        </Fragment>
    )
}

export default TileStops;