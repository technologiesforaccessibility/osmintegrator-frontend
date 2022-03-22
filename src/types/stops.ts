import { Stop } from 'api/apiClient';

export type TBusStopProperties = {
  outsideSelectedTile: boolean;
  stopType: number;
  hasReport: boolean;
  reportApproved: boolean;
};

export type TStopIconProperties = {
  iconUrl: string;
  iconAnchor: [number, number];
};

export type TStopShadowProperties = {
  shadowUrl: string;
  shadowAnchor: [number, number];
};

export type TConnectionData = Stop | null;
