import { NoteStatus } from 'api/apiClient';

export type TCoordinates = {
  lat: number | null;
  lon: number | null;
};

export type TMapReportContent = {
  lat: number;
  lon: number;
  text: string;
  id: string;
  tileId: string;
  status: NoteStatus;
};
