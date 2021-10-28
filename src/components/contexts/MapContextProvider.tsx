import {createContext, FC, useState} from 'react';
import {useSelector} from 'react-redux';
import {Connection, NewNote, NoteStatus, Stop, Tile} from '../../api/apiClient';
import {selectLoggedInUserRoles} from '../../redux/selectors/authSelector';
import i18n from '../../translations/i18n';
import {connectionVisibility, localStorageStopTypes} from '../../utilities/constants';

interface VisibilityOptions {
  connected: {
    localStorageName: string;
    name: string;
    value: {text: string; opacityValue: number; icon: () => JSX.Element};
  };
  unconnected: {
    localStorageName: string;
    name: string;
    value: {text: string; opacityValue: number; icon: () => JSX.Element};
  };
  approved: {
    localStorageName: string;
    name: string;
    value: {text: string; opacityValue: number; icon: () => JSX.Element};
  };
}

interface IMapContext {
  isTileActive: boolean;
  mapMode: string;
  isMapActive: boolean;
  areStopsVisible: boolean;
  propertyGrid: Stop | null;
  connectionData: Array<Record<string, unknown>>;
  rerenderConnections: boolean;
  newReportCoordinates: {lat: number | null; lon: number | null};
  activeTile: Tile | null;
  rerenderReports: boolean;
  importedConnections: Array<Connection>;
  importedReports: Array<NewNote>;
  isEditingReportMode: boolean;
  openReportContent: null | {lat: number; lon: number; text: string; id: string; tileId: string; status: NoteStatus};
  rerenderTiles: boolean;
  tiles: Array<Tile>;
  connectedStopIds: Array<string>;
  areManageReportButtonsVisible: boolean;
  visibilityOptions: VisibilityOptions;
  approvedStopIds: Array<string>;
  setApprovedStopIds: (arg: Array<string>) => void;
  setAreManageReportButtonsVisible: (arg: boolean) => void;
  resetMapSettings: () => void;
  setConnectedStopIds: (arg: Array<string>) => void;
  setTiles: (arg: Array<Tile>) => void;
  setRerenderTiles: (arg: boolean) => void;
  singleTileToggle: (arg: boolean) => void;
  activeMapToggle: (arg: boolean) => void;
  displayPropertyGrid: (arg: Stop | null) => void;
  updateConnectionData: (arg: Record<string, unknown>) => void;
  reset: () => void;
  shouldRenderConnections: (arg: boolean) => void;
  toogleMapMode: (arg: string) => void;
  setNewReportCoordinates: (arg: {lat: number | null; lon: number | null}) => void;
  resetReportCoordinates: () => void;
  setActiveTile: (arg: Tile) => void;
  setRerenderReports: (arg: boolean) => void;
  setImportedConnections: (arg: Array<Connection>) => void;
  setImportedReports: (arg: Array<NewNote>) => void;
  hideTileElements: () => void;
  setIsEditingReportMode: (arg: boolean) => void;
  setOpenReportContent: (
    arg: null | {lat: number; lon: number; text: string; id: string; tileId: string; status: NoteStatus},
  ) => void;
  resetMapContext: () => void;
  setIsTileActive: (arg: boolean) => void;
  closeTile: () => void;
  setVisibilityOptions: (arg: VisibilityOptions) => void;
  resetMapVisibility: () => void;
  authRoles: Array<string>;
}

export const MapModes = {
  view: 'View',
  report: 'Report',
  connection: 'Connection',
};

const init: IMapContext = {
  isTileActive: false,
  mapMode: MapModes.view,
  isMapActive: false,
  areStopsVisible: false,
  propertyGrid: null,
  connectionData: [],
  rerenderConnections: false,
  newReportCoordinates: {lat: null, lon: null},
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
      value: {text: 'string', opacityValue: 0, icon: () => <span />},
    },
    unconnected: {
      localStorageName: 'string',
      name: 'string',
      value: {text: 'string', opacityValue: 0, icon: () => <span />},
    },
    approved: {
      localStorageName: 'string',
      name: 'string',
      value: {text: 'string', opacityValue: 0, icon: () => <span />},
    },
  },
  approvedStopIds: [],
  setApprovedStopIds: () => null,
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
  toogleMapMode: () => null,
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
  authRoles: [],
};

export const MapContext = createContext<IMapContext>(init);

const initialReportCoords = {lat: null, lon: null};

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
    approved: {
      localStorageName: localStorageStopTypes.approved,
      name: i18n.t('connectionVisibility.nameApproved'),
      value: getValueFromStateOrReturn(localStorageStopTypes.approved, reset),
    },
  };
};

const MapContextProvider: FC = ({children}) => {
  const [isTileActive, setIsTileActive] = useState(false);
  const [isMapActive, setIsMapActive] = useState(false);
  const [areStopsVisible, setAreStopsVisible] = useState(false);
  const [propertyGrid, setPropertyGrid] = useState<Stop | null>(null);
  const [rerenderConnections, setRerenderConnections] = useState(false);
  const [connectionData, setConnectionData] = useState<Array<Record<string, unknown>>>([]);
  const [mapMode, setMapMode] = useState(MapModes.view);
  const [isEditingReportMode, setIsEditingReportMode] = useState(false);
  const [newReportCoordinates, setNewReportCoordinates] =
    useState<{lat: number | null; lon: number | null}>(initialReportCoords);
  const [rerenderReports, setRerenderReports] = useState(false);
  const [activeTile, setActiveTile] = useState<Tile | null>(null);
  const [importedConnections, setImportedConnections] = useState<Array<Connection>>([]);
  const [importedReports, setImportedReports] = useState<Array<NewNote>>([]);
  const [openReportContent, setOpenReportContent] = useState<null | {
    lat: number;
    lon: number;
    text: string;
    id: string;
    tileId: string;
    status: NoteStatus;
  }>(null);
  const [tiles, setTiles] = useState<Array<Tile>>([]);
  const [rerenderTiles, setRerenderTiles] = useState(false);
  const [connectedStopIds, setConnectedStopIds] = useState<Array<string>>([]);
  const [approvedStopIds, setApprovedStopIds] = useState<Array<string>>([]);
  const [areManageReportButtonsVisible, setAreManageReportButtonsVisible] = useState(false);
  const [visibilityOptions, setVisibilityOptions] = useState(initialVisibility());

  const authRoles = useSelector(selectLoggedInUserRoles);

  const singleTileToggle = (isActive: boolean) => {
    setIsTileActive(isActive);
    setAreStopsVisible(isActive);
    toogleMapMode(MapModes.view);
  };

  const activeMapToggle = setIsMapActive;

  const displayPropertyGrid = setPropertyGrid;

  const updateConnectionData = (data: Record<string, unknown>) => {
    if (data) {
      setConnectionData(oldState => [...oldState, data]);
    }
  };

  const reset = () => {
    setConnectionData([]);
    setPropertyGrid(null);
  };

  const hideTileElements = () => {
    setConnectionData([]);
    setPropertyGrid(null);
    setImportedConnections([]);
    setImportedReports([]);
  };

  const shouldRenderConnections = setRerenderConnections;

  const resetReportCoordinates = () => {
    setNewReportCoordinates(initialReportCoords);
  };

  const toogleMapMode = (mode: string) => {
    if (!Object.values(MapModes).includes(mode)) {
      return;
    }

    if (mode !== MapModes.view) {
      setIsEditingReportMode(false);
      setOpenReportContent(null);
    }

    setMapMode(mode);
  };

  const resetMapContext = () => {
    setIsTileActive(false);
    setAreStopsVisible(false);
    setConnectionData([]);
    setPropertyGrid(null);
    setMapMode(MapModes.view);
    setIsEditingReportMode(false);
    setActiveTile(null);
    setImportedConnections([]);
    setImportedReports([]);
  };

  const closeTile = () => {
    singleTileToggle(false);
    hideTileElements();
    setRerenderTiles(true);
  };

  const resetMapSettings = () => {
    setConnectedStopIds([]);
    setApprovedStopIds([]);
    setVisibilityOptions(initialVisibility());
  };

  const resetMapVisibility = () => {
    setVisibilityOptions(initialVisibility(true));
    Object.values(localStorageStopTypes).forEach(item => localStorage.removeItem(item));
  };

  return (
    <MapContext.Provider
      value={{
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
        approvedStopIds,
        setApprovedStopIds,
        setAreManageReportButtonsVisible,
        resetMapSettings,
        setConnectedStopIds,
        setTiles,
        setRerenderTiles,
        singleTileToggle,
        activeMapToggle,
        displayPropertyGrid,
        updateConnectionData,
        reset,
        shouldRenderConnections,
        toogleMapMode,
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
        authRoles,
      }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapContextProvider;
