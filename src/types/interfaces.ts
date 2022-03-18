import { Stop } from '../api/apiClient';

export interface ConnectedPairProps {
  markedStop: Stop | null;
  connectedStop: Stop | null;
  connection: { id: string } | null;
}
