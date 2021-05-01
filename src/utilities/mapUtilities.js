export function getPosition(osmStop, gtfsStop) {
    return [[osmStop.lat, osmStop.lon], [ gtfsStop.lat, gtfsStop.lon]]
}


export function generateConnectionData ( connection ) {
        if (connection[0].isOsm === true && connection[1].isOsm === false) {
            return {
                OsmStopId: connection[0].id.toString(),
                GtfsStopId: connection[1].id.toString(),
            };
        } else if (
            connection[0].isOsm === false &&
            connection[1].isOsm === true
        ) {
            return {
                OsmStopId: connection[1].id.toString(),
                GtfsStopId: connection[0].id.toString(),
            };
        }
        return null;
    };