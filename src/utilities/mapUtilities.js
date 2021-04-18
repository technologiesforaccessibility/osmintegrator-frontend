export function getPosition(osmStop, gtfsStop) {
    return [[osmStop.lat, osmStop.lon], [ gtfsStop.lat, gtfsStop.lon]]
}