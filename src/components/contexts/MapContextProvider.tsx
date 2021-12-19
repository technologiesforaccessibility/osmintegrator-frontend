import {createContext, FC, useCallback, useState, useReducer} from 'react';
import {useSelector} from 'react-redux';

import {Connection, Conversation, NoteStatus, Stop, Tile} from '../../api/apiClient';
import {selectLoggedInUserRoles} from '../../redux/selectors/authSelector';
import i18n from '../../translations/i18n';
import {connectionVisibility, localStorageStopTypes} from '../../utilities/constants';
import {ConnectedPairProps, MovedStop, MovedStopsReducerAction} from '../../types/interfaces';
import {Marker} from 'react-leaflet';

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
  propertyGrid: Stop | Conversation | null;
  connectionData: Array<{
    coordinates: {lat: number; lon: number};
    id: string;
    name: string;
    ref: string;
    isOsm: boolean;
  }>;
  rerenderConnections: boolean;
  newReportCoordinates: {lat: number | null; lon: number | null};
  activeTile: Tile | null;
  rerenderReports: boolean;
  importedConnections: Array<Connection>;
  importedReports: Array<Conversation>;
  isEditingReportMode: boolean;
  openReportContent: null | {lat: number; lon: number; text: string; id: string; tileId: string; status: NoteStatus};
  rerenderTiles: boolean;
  tiles: Array<Tile>;
  connectedStopIds: Array<string>;
  areManageReportButtonsVisible: boolean;
  visibilityOptions: VisibilityOptions;
  approvedStopIds: Array<string>;
  activeStop: Stop | null;
  isSidebarConnectionHandlerVisible: boolean;
  tileStops: Array<Stop>;
  connectedStopPair: ConnectedPairProps;
  draggableStopId: string | null;
  movedStopsState: MovedStop[];
  markerReference: null | typeof Marker;
  resetPositionFunction: null | Function;
  setResetPositionFunction: (arg: null | Function) => void;
  setMarkerReference: (arg: null | typeof Marker) => void;
  movedStopsDispatch: (action: MovedStopsReducerAction) => void;
  setDraggableStopId: (stop: string | null) => void;
  setConnectedStopPair: (arg: any) => void;
  setTileStops: (arg: Array<Stop>) => void;
  setIsSidebarConnectionHandlerVisible: (arg: boolean) => void;
  setApprovedStopIds: (arg: Array<string>) => void;
  setAreManageReportButtonsVisible: (arg: boolean) => void;
  resetMapSettings: () => void;
  setConnectedStopIds: (arg: Array<string>) => void;
  setTiles: (arg: Array<Tile>) => void;
  setRerenderTiles: (arg: boolean) => void;
  singleTileToggle: (arg: boolean) => void;
  activeMapToggle: (arg: boolean) => void;
  displayPropertyGrid: (arg: Stop | Conversation | null) => void;
  updateConnectionData: (arg: {
    coordinates: {lat: number; lon: number};
    id: string;
    name: string;
    ref: string;
    isOsm: boolean;
  }) => void;
  reset: () => void;
  shouldRenderConnections: (arg: boolean) => void;
  toogleMapMode: (arg: string) => void;
  setNewReportCoordinates: React.Dispatch<React.SetStateAction<{lat: number | null; lon: number | null}>>;
  resetReportCoordinates: () => void;
  setActiveTile: React.Dispatch<React.SetStateAction<Tile | null>>;
  setRerenderReports: React.Dispatch<React.SetStateAction<boolean>>;
  setImportedConnections: React.Dispatch<React.SetStateAction<Array<Connection>>>;
  setImportedReports: React.Dispatch<React.SetStateAction<Array<Conversation>>>;
  hideTileElements: () => void;
  setIsEditingReportMode: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenReportContent: React.Dispatch<
    React.SetStateAction<null | {
      lat: number;
      lon: number;
      text: string;
      id: string;
      tileId: string;
      status: NoteStatus;
    }>
  >;
  resetMapContext: () => void;
  setIsTileActive: React.Dispatch<React.SetStateAction<boolean>>;
  closeTile: () => void;
  setVisibilityOptions: React.Dispatch<React.SetStateAction<VisibilityOptions>>;
  resetMapVisibility: () => void;
  authRoles: Array<string>;
  setActiveStop: React.Dispatch<React.SetStateAction<Stop | null>>;
}

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
  activeStop: null,
  tileStops: [],
  isSidebarConnectionHandlerVisible: false,
  connectedStopPair: {markedStop: null, connectedStop: null, connection: null},
  authRoles: [],
  draggableStopId: null,
  movedStopsState: [],
  markerReference: null,
  resetPositionFunction: null,
  setResetPositionFunction: () => null,
  setMarkerReference: () => null,
  movedStopsDispatch: () => null,
  setDraggableStopId: () => null,
  setConnectedStopPair: () => null,
  setIsSidebarConnectionHandlerVisible: () => null,
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
  setActiveStop: () => null,
  setTileStops: () => null,
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
  const [propertyGrid, setPropertyGrid] = useState<Stop | Conversation | null>(null);
  const [rerenderConnections, setRerenderConnections] = useState(false);
  const [connectionData, setConnectionData] = useState<
    Array<{coordinates: {lat: number; lon: number}; id: string; name: string; ref: string; isOsm: boolean}>
  >([]);
  const [mapMode, setMapMode] = useState(MapModes.view);
  const [isEditingReportMode, setIsEditingReportMode] = useState(false);
  const [newReportCoordinates, setNewReportCoordinates] =
    useState<{lat: number | null; lon: number | null}>(initialReportCoords);
  const [rerenderReports, setRerenderReports] = useState(false);
  const [activeTile, setActiveTile] = useState<Tile | null>(null);
  const [importedConnections, setImportedConnections] = useState<Array<Connection>>([]);
  const [importedReports, setImportedReports] = useState<Array<Conversation>>([]);
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
  const [activeStop, setActiveStop] = useState<Stop | null>(null);
  const [tileStops, setTileStops] = useState<Array<Stop>>([]);
  const [isSidebarConnectionHandlerVisible, setIsSidebarConnectionHandlerVisible] = useState(false);
  const [connectedStopPair, setConnectedStopPair] = useState({markedStop: null, connectedStop: null, connection: null});
  const [draggableStopId, setDraggableStopId] = useState<string | null>(null);
  const [markerReference, setMarkerReference] = useState<null | typeof Marker>(null);
  const [resetPositionFunction, setResetPositionFunction] = useState<null | Function>(null);

  const temporaryMovedStopsReducer = (state: MovedStop[], action: MovedStopsReducerAction): MovedStop[] => {
    const {payload} = action;
    const index = state.findIndex(({id}) => id === payload.id);
    console.log('FUNKCJA ODPALONA');
    switch (action.type) {
      case 'ADD':
        if (!payload.position) {
          return state;
        }

        if (index >= 0) {
          state[index] = {id: state[index].id, externalId: state[index].externalId, position: payload.position};
          console.log('znaleziono i zaktualizowano');
          console.log({state});
          return state;
        } else {
          const myObj = {id: payload.id, externalId: payload.externalId, position: payload.position};
          console.log('nie znaleziono i dodano');
          console.log('wynik', state.concat([myObj]));
          return state.concat([myObj]);
        }
      case 'REMOVE':
        const output = state.splice(index, 1);
        console.log('usunieto');
        console.log({output});
        return output;
      default:
        console.log('PROBLEM Z REDUCEREM');
        throw new Error();
    }
  };

  const [movedStopsState, movedStopsDispatch] = useReducer(temporaryMovedStopsReducer, []);

  const authRoles = useSelector(selectLoggedInUserRoles);

  const toogleMapMode = useCallback((mode: string) => {
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
      toogleMapMode(MapModes.view);
    },
    [toogleMapMode],
  );

  const updateConnectionData = useCallback(
    (data: {coordinates: {lat: number; lon: number}; id: string; name: string; ref: string; isOsm: boolean}) => {
      if (data) {
        setConnectionData(oldState => [...oldState, data]);
      }
    },
    [],
  );

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
    setConnectedStopPair({markedStop: null, connectedStop: null, connection: null});
    setTileStops([]);
  }, []);

  const closeTile = useCallback(() => {
    singleTileToggle(false);
    hideTileElements();
    setRerenderTiles(true);
  }, [hideTileElements, singleTileToggle]);

  const resetMapSettings = useCallback(() => {
    setConnectedStopIds([]);
    setApprovedStopIds([]);
    setVisibilityOptions(initialVisibility());
  }, []);

  const resetMapVisibility = useCallback(() => {
    setVisibilityOptions(initialVisibility(true));
    Object.values(localStorageStopTypes).forEach(item => localStorage.removeItem(item));
  }, []);

  if (markerReference) {
    console.log({markerReference});
  }
  console.log(typeof resetPositionFunction);
  if (resetPositionFunction) {
    console.log(typeof resetPositionFunction);
  }

  return (
    <MapContext.Provider
      value={{
        authRoles,
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
        activeStop,
        isSidebarConnectionHandlerVisible,
        connectedStopPair,
        tileStops,
        draggableStopId,
        movedStopsState,
        markerReference,
        resetPositionFunction,
        setResetPositionFunction,
        setMarkerReference,
        movedStopsDispatch,
        setDraggableStopId,
        setTileStops,
        setConnectedStopPair,
        setIsSidebarConnectionHandlerVisible,
        setApprovedStopIds,
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
        setActiveStop,
      }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapContextProvider;
