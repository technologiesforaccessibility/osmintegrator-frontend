import { Connection, Conversation, Stop, Tile } from 'api/apiClient';
import React from 'react';
import { Marker } from 'react-leaflet';
import { ConnectionRadio } from 'types/enums';

import { ConnectedPairProps, MovedStop, MovedStopAction } from './interfaces';
import { TCoordinates, TMapReportContent } from './map';

interface OptionValue {
  text: string;
  opacityValue: number;
  icon: () => JSX.Element;
}

interface Option {
  localStorageName: string;
  name: string;
  value: OptionValue;
}

interface VisibilityOptions {
  connected: Option;
  unconnected: Option;
  mapReport: Option;
}

export interface IMapContext {
  isTileActive: boolean;
  mapMode: string;
  isMapActive: boolean;
  areStopsVisible: boolean;
  propertyGrid: Stop | Conversation | null;
  connectionData: Stop[];
  rerenderConnections: boolean;
  newReportCoordinates: TCoordinates;
  activeTile: Tile | null;
  rerenderReports: boolean;
  importedConnections: Array<Connection>;
  importedReports: Array<Conversation>;
  isEditingReportMode: boolean;
  openReportContent: null | TMapReportContent;
  rerenderTiles: boolean;
  tiles: Array<Tile>;
  connectedStopIds: Array<string>;
  areManageReportButtonsVisible: boolean;
  visibilityOptions: VisibilityOptions;
  activeStop: Stop | null;
  isSidebarConnectionHandlerVisible: boolean;
  tileStops: Stop[];
  connectedStopPair: ConnectedPairProps;
  draggableStopId: string | null;
  movedStops: MovedStop[];
  markerReference: null | typeof Marker;
  resetPositionFunction: null | Function;
  setResetPositionFunction: (arg: null | Function) => void;
  setMarkerReference: (arg: null | typeof Marker) => void;
  movedStopsDispatch: (action: MovedStopAction) => void;
  setDraggableStopId: (stop: string | null) => void;
  setRerenderConnections: (arg: boolean) => void;
  setConnectedStopPair: (arg: any) => void;
  setTileStops: (arg: Stop[]) => void;
  setIsSidebarConnectionHandlerVisible: (arg: boolean) => void;
  setAreManageReportButtonsVisible: (arg: boolean) => void;
  resetMapSettings: () => void;
  setConnectedStopIds: (arg: Array<string>) => void;
  setTiles: (arg: Array<Tile>) => void;
  setRerenderTiles: (arg: boolean) => void;
  singleTileToggle: (arg: boolean) => void;
  activeMapToggle: (arg: boolean) => void;
  displayPropertyGrid: (arg: Stop | Conversation | null) => void;
  updateConnectionData: (arg: Stop) => void;
  reset: () => void;
  shouldRenderConnections: (arg: boolean) => void;
  toggleMapMode: (arg: string) => void;
  setNewReportCoordinates: React.Dispatch<React.SetStateAction<TCoordinates>>;
  resetReportCoordinates: () => void;
  setActiveTile: React.Dispatch<React.SetStateAction<Tile | null>>;
  setRerenderReports: React.Dispatch<React.SetStateAction<boolean>>;
  setImportedConnections: React.Dispatch<React.SetStateAction<Array<Connection>>>;
  setImportedReports: React.Dispatch<React.SetStateAction<Array<Conversation>>>;
  hideTileElements: () => void;
  setIsEditingReportMode: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenReportContent: React.Dispatch<React.SetStateAction<null | TMapReportContent>>;
  resetMapContext: () => void;
  setIsTileActive: React.Dispatch<React.SetStateAction<boolean>>;
  closeTile: () => void;
  setVisibilityOptions: React.Dispatch<React.SetStateAction<VisibilityOptions>>;
  resetMapVisibility: () => void;
  authRoles: Array<string>;
  setActiveStop: React.Dispatch<React.SetStateAction<Stop | null>>;
  connectionRadio: ConnectionRadio;
  setConnectionRadio: (arg: ConnectionRadio) => void;
}
