import { Connection, Conversation, Stop, Tile } from 'api/apiClient';
import { createContext, FC, useCallback, useReducer, useState } from 'react';
import { Marker } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { selectLoggedInUserRoles } from 'redux/selectors/authSelector';
import { ConnectionRadio } from 'types/enums';
import { ConnectedPairProps, MovedStop, MovedStopAction } from 'types/interfaces';
import { TCoordinates, TMapReportContent } from 'types/map';
import { IMapContext } from 'types/map-context';
import { localStorageStopTypes } from 'utilities/constants';

import {
  initialMapContextState,
  initialMapContextVisibility,
  initialReportCoords,
  MapModes,
} from '../../utilities/MapContextState';

export const MapContext = createContext<IMapContext>(initialMapContextState);

const MapContextProvider: FC = ({ children }) => {
  const [rerenderConnections, setRerenderConnections] = useState(false);
  const [connectionData, setConnectionData] = useState<Stop[]>([]);
  const [connectionRadio, setConnectionRadio] = useState<ConnectionRadio>(ConnectionRadio.ADD);
  const [importedConnections, setImportedConnections] = useState<Connection[]>([]);
  const [connectedStopIds, setConnectedStopIds] = useState<string[]>([]);
  const [isSidebarConnectionHandlerVisible, setIsSidebarConnectionHandlerVisible] = useState(false);
  const [connectedStopPair, setConnectedStopPair] = useState<ConnectedPairProps>({
    markedStop: null,
    connectedStop: null,
    connection: null,
  });

  const [tiles, setTiles] = useState<Tile[]>([]);
  const [isTileActive, setIsTileActive] = useState(false);
  const [activeTile, setActiveTile] = useState<Tile | null>(null);
  const [tileStops, setTileStops] = useState<Stop[]>([]);
  const [rerenderTiles, setRerenderTiles] = useState(false);

  const [newReportCoordinates, setNewReportCoordinates] = useState<TCoordinates>(initialReportCoords);
  const [isEditingReportMode, setIsEditingReportMode] = useState(false);
  const [rerenderReports, setRerenderReports] = useState(false);
  const [importedReports, setImportedReports] = useState<Conversation[]>([]);
  const [openReportContent, setOpenReportContent] = useState<null | TMapReportContent>(null);
  const [areManageReportButtonsVisible, setAreManageReportButtonsVisible] = useState(false);

  const [isMapActive, setIsMapActive] = useState(false);
  const [mapMode, setMapMode] = useState(MapModes.view);

  const [visibilityOptions, setVisibilityOptions] = useState(initialMapContextVisibility());
  const [areStopsVisible, setAreStopsVisible] = useState(false);
  const [activeStop, setActiveStop] = useState<Stop | null>(null);
  const [propertyGrid, setPropertyGrid] = useState<Stop | Conversation | null>(null);

  const [draggableStopId, setDraggableStopId] = useState<string | null>(null);
  const [markerReference, setMarkerReference] = useState<null | typeof Marker>(null);
  const [resetPositionFunction, setResetPositionFunction] = useState<null | Function>(null);

  const movedStopsReducer = (state: MovedStop[], action: MovedStopAction): MovedStop[] => {
    const { payload } = action;
    const index = state.findIndex(({ id }) => id === payload.id);
    switch (action.type) {
      case 'ADD':
        if (!payload.position) {
          return state;
        }

        if (index >= 0) {
          state[index] = { id: state[index].id, externalId: state[index].externalId, position: payload.position };
          return state;
        } else {
          const myObj = { id: payload.id, externalId: payload.externalId, position: payload.position };
          return state.concat([myObj]);
        }
      case 'REMOVE':
        const output = state.splice(index, 1);
        return output;
      default:
        throw new Error();
    }
  };

  const [movedStopsState, movedStopsDispatch] = useReducer(movedStopsReducer, []);

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
    setVisibilityOptions(initialMapContextVisibility());
  }, []);

  const resetMapVisibility = useCallback(() => {
    setVisibilityOptions(initialMapContextVisibility(true));
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
        draggableStopId,
        movedStops: movedStopsState,
        markerReference,
        resetPositionFunction,
        setResetPositionFunction,
        setMarkerReference,
        movedStopsDispatch,
        setDraggableStopId,
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
