import {LatLngLiteral} from 'leaflet';

export interface ConnectedPairProps {
  markedStop: {id: string; name: string} | null;
  connectedStop: {id: string; name: string} | null;
  connection: {id: string; approved: boolean} | null;
}

export interface MovedStop {
  id: string;
  externalId: number;
  position?: LatLngLiteral;
}

export enum MovedStopsReducerActionKind {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

export interface MovedStopsReducerAction {
  type: MovedStopsReducerActionKind;
  payload: MovedStop;
}
