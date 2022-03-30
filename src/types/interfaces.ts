import { Stop } from 'api/apiClient';
import { LatLngLiteral } from 'leaflet';

import { MovedStopActionType } from './enums';

export interface ConnectedPairProps {
  markedStop: Stop | null;
  connectedStop: Stop | null;
  connection: { id: string } | null;
}

export interface MovedStop {
  id: string;
  externalId: number;
  position?: LatLngLiteral;
}

export interface MovedStopAction {
  type: MovedStopActionType;
  payload: MovedStop;
}
