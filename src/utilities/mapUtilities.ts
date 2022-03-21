import { LatLngExpression } from 'leaflet';
import { Stop } from '../api/apiClient';
import { StopType } from '../types/enums';

const getPosition = (osmStop: Stop, gtfsStop: Stop): LatLngExpression[] => {
  return [
    [osmStop.lat ?? 0, osmStop.lon ?? 0],
    [gtfsStop.lat ?? 0, gtfsStop.lon ?? 0],
  ];
};

const generateConnectionData = (connection: any, tileId?: any) => {
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

const generateStopName = (stop: Stop) => {
  let result = stop.name || stop.id;
  if (stop.number) {
    result += ' ' + stop.number;
  }
  if (stop.stopType === StopType.GTFS) return result;

  const refTag = stop.tags?.find(x => x.key === 'ref');
  return (result += `, ref: ${refTag?.value || '-'}`);
};

export { getPosition, generateConnectionData, generateStopName };
