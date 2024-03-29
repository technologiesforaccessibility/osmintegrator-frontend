import { Stop } from 'api/apiClient';
import { LatLngExpression } from 'leaflet';
import { StopType } from 'types/enums';
import { TConnectionData } from 'types/stops';

const getPosition = (osmStop: Stop, gtfsStop: Stop): LatLngExpression[] => {
  return [
    [osmStop.lat ?? 0, osmStop.lon ?? 0],
    [gtfsStop.lat ?? 0, gtfsStop.lon ?? 0],
  ];
};

const generateConnectionData = (connection: TConnectionData[], tileId?: any) => {
  if (!connection || !connection?.[0] || !connection?.[1]) throw new Error();

  if (connection[0].stopType === StopType.OSM && connection[1].stopType !== StopType.OSM) {
    return {
      osmStopId: connection[0].id?.toString() ?? '',
      gtfsStopId: connection[1].id?.toString() ?? '',
      tileId: tileId,
    };
  } else if (connection[0].stopType !== StopType.OSM && connection[1].stopType === StopType.OSM) {
    return {
      osmStopId: connection[1].id?.toString() ?? '',
      gtfsStopId: connection[0].id?.toString() ?? '',
      tileId: tileId,
    };
  }

  throw new Error();
};

const generateStopName = (stop: Stop | null) => {
  if (!stop) return '-';

  let result = stop.name || stop.id;
  if (stop.number) {
    result += ' ' + stop.number;
  }
  if (stop.stopType === StopType.GTFS) return result;

  const refTag = stop.tags?.find(x => x.key === 'ref:metropoliaztm');
  return (result += `, ref:metropoliaztm : ${refTag?.value || '-'}`);
};

export { generateConnectionData, generateStopName, getPosition };
