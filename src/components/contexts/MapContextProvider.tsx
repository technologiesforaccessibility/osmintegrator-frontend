import { Connection, Conversation, Stop, Tile } from 'api/apiClient';
import { createContext, FC, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedInUserRoles } from 'redux/selectors/authSelector';
import i18n from 'translations/i18n';
import { ConnectionRadio } from 'types/enums';
import { ConnectedPairProps } from 'types/interfaces';
import { TCoordinates, TMapReportContent } from 'types/map';
import { IMapContext } from 'types/map-context';
import { connectionVisibility, localStorageStopTypes } from 'utilities/constants';

export const MapModes = {
  view: 'View',
  report: 'Report',
  connection: 'Connection',
  tile: 'Tile',
  sync: 'Sync',
};

const init: IMapContext = {
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

export const MapContext = createContext<IMapContext>(init);

const initialReportCoords = { lat: null, lon: null };

const getValueFromStateOrReturn = (itemKey: string, reset: boolean) => {
  const storageItem = localStorage.getItem(itemKey);

  if (storageItem && !reset) {
    //good for now - can be rafactored later
    const connectionVisibilityKey = Object.entries(connectionVisibility).filter(
      el => el[1].text === JSON.parse(storageItem).text,
    )[0][0];

    switch (connectionVisibilityKey) {
      case 'hidden':
        return connectionVisibility.hidden;
      case 'semiTransparent':
        return connectionVisibility.semiTransparent;
      case 'visible':
        return connectionVisibility.visible;
      default:
        return connectionVisibility.visible;
    }
  } else {
    return connectionVisibility.visible;
  }
};

const initialVisibility = (reset = false) => {
  return {
    connected: {
      localStorageName: localStorageStopTypes.connected,
      name: i18n.t('connectionVisibility.nameConnected'),
      value: getValueFromStateOrReturn(localStorageStopTypes.connected, reset),
    },
    unconnected: {
      localStorageName: localStorageStopTypes.unconnected,
      name: i18n.t('connectionVisibility.nameUnconnected'),
      value: getValueFromStateOrReturn(localStorageStopTypes.unconnected, reset),
    },
    mapReport: {
      localStorageName: localStorageStopTypes.unconnected,
      name: i18n.t('connectionVisibility.mapReport'),
      value: getValueFromStateOrReturn(localStorageStopTypes.unconnected, reset),
    },
  };
};

const MapContextProvider: FC = ({ children }) => {
  const [connectionRadio, setConnectionRadio] = useState<ConnectionRadio>(ConnectionRadio.ADD);
  const [isTileActive, setIsTileActive] = useState(false);
  const [isMapActive, setIsMapActive] = useState(false);
  const [areStopsVisible, setAreStopsVisible] = useState(false);
  const [propertyGrid, setPropertyGrid] = useState<Stop | Conversation | null>(null);
  const [rerenderConnections, setRerenderConnections] = useState(false);
  const [connectionData, setConnectionData] = useState<Stop[]>([]);
  const [mapMode, setMapMode] = useState(MapModes.view);
  const [isEditingReportMode, setIsEditingReportMode] = useState(false);
  const [newReportCoordinates, setNewReportCoordinates] = useState<TCoordinates>(initialReportCoords);
  const [rerenderReports, setRerenderReports] = useState(false);
  const [activeTile, setActiveTile] = useState<Tile | null>(null);
  const [importedConnections, setImportedConnections] = useState<Array<Connection>>([]);
  const [importedReports, setImportedReports] = useState<Array<Conversation>>([]);
  const [openReportContent, setOpenReportContent] = useState<null | TMapReportContent>(null);
  const [tiles, setTiles] = useState<Array<Tile>>([]);
  const [rerenderTiles, setRerenderTiles] = useState(false);
  const [connectedStopIds, setConnectedStopIds] = useState<Array<string>>([]);
  const [areManageReportButtonsVisible, setAreManageReportButtonsVisible] = useState(false);
  const [visibilityOptions, setVisibilityOptions] = useState(initialVisibility());
  const [activeStop, setActiveStop] = useState<Stop | null>(null);
  const [tileStops, setTileStops] = useState<Stop[]>([]);
  const [isSidebarConnectionHandlerVisible, setIsSidebarConnectionHandlerVisible] = useState(false);
  const [connectedStopPair, setConnectedStopPair] = useState<ConnectedPairProps>({
    markedStop: null,
    connectedStop: null,
    connection: null,
  });

  const authRoles = useSelector(selectLoggedInUserRoles);

  const toggleMapMode = useCallback((mode: string) => {
    if (!Object.values(MapModes).includes(mode)) {
      return;
    }

    if (mode !== MapModes.view) {
      setIsEditingReportMode(false);
      setOpenReportContent(null);
    }

    setMapMode(mode);
  }, []);

  const singleTileToggle = useCallback(
    (isActive: boolean) => {
      setIsTileActive(isActive);
      setAreStopsVisible(isActive);
      toggleMapMode(MapModes.view);
    },
    [toggleMapMode],
  );

  const updateConnectionData = useCallback((data: Stop) => {
    if (data) {
      setConnectionData(oldState => [...oldState, data]);
    }
  }, []);

  const reset = useCallback(() => {
    setConnectionData([]);
    setPropertyGrid(null);
  }, []);

  const hideTileElements = useCallback(() => {
    setNewReportCoordinates(initialReportCoords);
    setConnectionData([]);
    setPropertyGrid(null);
    setImportedConnections([]);
    setImportedReports([]);
  }, []);

  const resetReportCoordinates = useCallback(() => {
    setNewReportCoordinates(initialReportCoords);
  }, []);

  const resetMapContext = useCallback(() => {
    setIsTileActive(false);
    setAreStopsVisible(false);
    setConnectionData([]);
    setPropertyGrid(null);
    setMapMode(MapModes.view);
    setIsEditingReportMode(false);
    setActiveTile(null);
    setImportedConnections([]);
    setImportedReports([]);
    setIsSidebarConnectionHandlerVisible(false);
    setConnectedStopPair({ markedStop: null, connectedStop: null, connection: null });
    setTileStops([]);
  }, []);

  const closeTile = useCallback(() => {
    singleTileToggle(false);
    hideTileElements();
    setRerenderTiles(true);
  }, [hideTileElements, singleTileToggle]);

  const resetMapSettings = useCallback(() => {
    setConnectedStopIds([]);
    setVisibilityOptions(initialVisibility());
  }, []);

  const resetMapVisibility = useCallback(() => {
    setVisibilityOptions(initialVisibility(true));
    Object.values(localStorageStopTypes).forEach(item => localStorage.removeItem(item));
  }, []);

  return (
    <MapContext.Provider
      value={{
        authRoles: authRoles ?? [],
        isTileActive,
        mapMode,
        isMapActive,
        areStopsVisible,
        propertyGrid,
        connectionData,
        rerenderConnections,
        newReportCoordinates,
        activeTile,
        rerenderReports,
        importedConnections,
        importedReports,
        isEditingReportMode,
        openReportContent,
        rerenderTiles,
        tiles,
        connectedStopIds,
        areManageReportButtonsVisible,
        visibilityOptions,
        activeStop,
        isSidebarConnectionHandlerVisible,
        connectedStopPair,
        tileStops,
        setRerenderConnections,
        setTileStops,
        setConnectedStopPair,
        setIsSidebarConnectionHandlerVisible,
        setAreManageReportButtonsVisible,
        resetMapSettings,
        setConnectedStopIds,
        setTiles,
        setRerenderTiles,
        singleTileToggle,
        activeMapToggle: setIsMapActive,
        displayPropertyGrid: setPropertyGrid,
        updateConnectionData,
        reset,
        shouldRenderConnections: setRerenderConnections,
        toggleMapMode,
        setNewReportCoordinates,
        resetReportCoordinates,
        setActiveTile,
        setRerenderReports,
        setImportedConnections,
        setImportedReports,
        hideTileElements,
        setIsEditingReportMode,
        setOpenReportContent,
        resetMapContext,
        setIsTileActive,
        closeTile,
        setVisibilityOptions,
        resetMapVisibility,
        setActiveStop,
        connectionRadio,
        setConnectionRadio,
      }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapContextProvider;
