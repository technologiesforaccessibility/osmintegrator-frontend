import {createContext, useState} from 'react';

export const MapContext = createContext();

export const MapModes = {
  view: 'View',
  report: 'Report',
  connection: 'Connection',
  approveConnections: 'Approve Connections',
};

const initialReportCoords = {lat: null, lon: null};

const MapContextProvider = ({children}) => {
  const [isTileActive, setIsTileActive] = useState(false);
  const [isMapActive, setIsMapActive] = useState(false);
  const [areStopsVisible, setAreStopsVisible] = useState(false);
  const [propertyGrid, setPropertyGrid] = useState(null);
  const [rerenderConnections, setRerenderConnections] = useState(false);
  const [connectionData, setConnectionData] = useState([]);
  const [mapMode, setMapMode] = useState(MapModes.view);
  const [isEditingReportMode, setIsEditingReportMode] = useState(false);
  const [newReportCoordinates, setNewReportCoordinates] = useState(initialReportCoords);
  const [rerenderReports, setRerenderReports] = useState(false);
  const [activeTile, setActiveTile] = useState(null);
  const [importedConnections, setImportedConnections] = useState([]);
  const [importedReports, setImportedReports] = useState([]);
  const [openReportContent, setOpenReportContent] = useState(null);
  const [tiles, setTiles] = useState([]);
  const [rerenderTiles, setRerenderTiles] = useState(false);
  const [connectedStopIds, setConnectedStopIds] = useState([]);
  const [connectedStopVisibility, setConnectedStopVisibility] = useState('Visible');
  const [connectionLineVisbility, setConnectionLineVisbility] = useState('Visible');
  const [areManageReportButtonsVisible, setAreManageReportButtonsVisible] = useState(false);

  const singleTileToggle = isActive => {
    setIsTileActive(isActive);
    setAreStopsVisible(isActive);
    toogleMapMode(MapModes.view);
  };

  const activeMapToggle = setIsMapActive;

  const displayPropertyGrid = setPropertyGrid;

  const updateConnectionData = data => {
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

  const toogleMapMode = mode => {
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
    setActiveTile({});
    setImportedConnections([]);
    setImportedReports([]);
  };

  const closeTile = () => {
    singleTileToggle(false);
    hideTileElements();
    setRerenderTiles(true);
  };

  const resetMapSettings = () => {
    setConnectedStopIds(null);
    setConnectedStopVisibility('Visible');
    setConnectionLineVisbility('Visible');
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
        connectedStopVisibility,
        connectionLineVisbility,
        areManageReportButtonsVisible,
        setAreManageReportButtonsVisible,
        setConnectionLineVisbility,
        resetMapSettings,
        setConnectedStopVisibility,
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
      }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapContextProvider;
