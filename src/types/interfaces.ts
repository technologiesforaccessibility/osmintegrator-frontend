export interface ConnectedPairProps {
  markedStop: {id: string; name: string} | null;
  connectedStop: {id: string; name: string} | null;
  connection: {id: string; approved: boolean} | null;
}
