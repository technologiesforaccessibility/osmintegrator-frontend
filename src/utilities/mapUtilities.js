import {StopType} from '../types/enums';

const getPosition = (osmStop, gtfsStop) => {
  return [
    [osmStop.lat, osmStop.lon],
    [gtfsStop.lat, gtfsStop.lon],
  ];
};

const generateConnectionData = (connection, tileId) => {
  if (connection[0].stopType === StopType.OSM && connection[1].stopType !== StopType.OSM) {
    return {
      osmStopId: connection[0].id.toString(),
      gtfsStopId: connection[1].id.toString(),
      tileId: tileId,
    };
  } else if (connection[0].stopType !== StopType.OSM && connection[1].stopType === StopType.OSM) {
    return {
      osmStopId: connection[1].id.toString(),
      gtfsStopId: connection[0].id.toString(),
      tileId: tileId,
    };
  }
  throw new Error();
};

const generateStopName = stop => {
  let result = stop.name || stop.id;
  if (stop.number) {
    result += ' ' + stop.number;
  }
  if (stop.stopType === StopType.GTFS) return result;
  if (stop.tags) result += stop.tags.find(x => x.key === 'ref')?.value || '-';

  return result;
};

export {getPosition, generateConnectionData, generateStopName};
