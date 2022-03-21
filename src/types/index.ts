import { any, bool, number, shape, string } from 'prop-types';

export const tileType = shape({
  id: string,
  x: number,
  y: number,
  maxLat: number,
  minLon: number,
  minLat: number,
  maxLon: number,
  overlapMaxLat: number,
  overlapMinLon: number,
  overlapMinLat: number,
  overlapMaxLon: number,
  osmStopsCount: number,
  gtfsStopsCount: number,
  usersCount: number,
  stops: any,
  approvedByEditor: bool,
  approvedBySupervisor: bool,
});
