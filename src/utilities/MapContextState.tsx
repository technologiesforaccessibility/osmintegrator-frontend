import i18n from 'translations/i18n';
import { ConnectionRadio } from 'types/enums';
import { IMapContext } from 'types/map-context';
import { localStorageStopTypes } from 'utilities/constants';
import { getVisibilityValueFromStateOrReturn } from 'utilities/utilities';

export const MapModes = {
  view: 'View',
  report: 'Report',
  connection: 'Connection',
  tile: 'Tile',
  sync: 'Sync',
  pan: 'Pan',
};

export const initialMapContextState: IMapContext = {
  isTileActive: false,
  mapMode: MapModes.view,
  isMapActive: false,
  areStopsVisible: false,
  propertyGrid: null,
  connectionData: [],
  rerenderConnections: false,
  newReportCoordinates: { lat: null, lon: null },
  activeTile: null,
  rerenderReports: false,
  importedConnections: [],
  importedReports: [],
  isEditingReportMode: false,
  openReportContent: null,
  rerenderTiles: false,
  tiles: [],
  connectedStopIds: [],
  areManageReportButtonsVisible: false,
  visibilityOptions: {
    connected: {
      localStorageName: 'string',
      name: 'string',
      value: { text: 'string', opacityValue: 0, icon: () => <span /> },
    },
    unconnected: {
      localStorageName: 'string',
      name: 'string',
      value: { text: 'string', opacityValue: 0, icon: () => <span /> },
    },
    mapReport: {
      localStorageName: 'string',
      name: 'string',
      value: { text: 'string', opacityValue: 0, icon: () => <span /> },
    },
  },
  activeStop: null,
  tileStops: [],
  isSidebarConnectionHandlerVisible: false,
  connectedStopPair: { markedStop: null, connectedStop: null, connection: null },
  authRoles: [],
  draggableStopId: null,
  movedStops: [],
  markerReference: null,
  setMarkerReference: () => null,
  movedStopsDispatch: () => null,
  setDraggableStopId: () => null,
  setRerenderConnections: () => null,
  setConnectedStopPair: () => null,
  setIsSidebarConnectionHandlerVisible: () => null,
  setAreManageReportButtonsVisible: () => null,
  resetMapSettings: () => null,
  setConnectedStopIds: () => null,
  setTiles: () => null,
  setRerenderTiles: () => null,
  singleTileToggle: () => null,
  activeMapToggle: () => null,
  displayPropertyGrid: () => null,
  updateConnectionData: () => null,
  setConnectionData: () => null,
  reset: () => null,
  shouldRenderConnections: () => null,
  toggleMapMode: () => null,
  setNewReportCoordinates: () => null,
  resetReportCoordinates: () => null,
  setActiveTile: () => null,
  setRerenderReports: () => null,
  setImportedConnections: () => null,
  setImportedReports: () => null,
  hideTileElements: () => null,
  setIsEditingReportMode: () => null,
  setOpenReportContent: () => null,
  resetMapContext: () => null,
  setIsTileActive: () => null,
  closeTile: () => null,
  setVisibilityOptions: () => null,
  resetMapVisibility: () => null,
  setActiveStop: () => null,
  setTileStops: () => null,
  connectionRadio: ConnectionRadio.ADD,
  setConnectionRadio: () => null,
};

export const initialMapContextVisibility = (reset = false) => ({
  connected: {
    localStorageName: localStorageStopTypes.connected,
    name: i18n.t('connectionVisibility.nameConnected'),
    value: getVisibilityValueFromStateOrReturn(localStorageStopTypes.connected, reset),
  },
  unconnected: {
    localStorageName: localStorageStopTypes.unconnected,
    name: i18n.t('connectionVisibility.nameUnconnected'),
    value: getVisibilityValueFromStateOrReturn(localStorageStopTypes.unconnected, reset),
  },
  mapReport: {
    localStorageName: localStorageStopTypes.unconnected,
    name: i18n.t('connectionVisibility.mapReport'),
    value: getVisibilityValueFromStateOrReturn(localStorageStopTypes.unconnected, reset),
  },
});

export const initialReportCoords = { lat: null, lon: null };
