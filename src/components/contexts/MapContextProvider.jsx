import {createContext, useState} from 'react';

export const MapContext = createContext();

const initialReportCoords = {lat: null, lon: null};

const MapContextProvider = ({children}) => {
  const [isTileActive, setIsTileActive] = useState(false);
  const [isMapActive, setIsMapActive] = useState(false);
  const [areStopsVisible, setAreStopsVisible] = useState(false);
  const [propertyGrid, setPropertyGrid] = useState(null);
  const [rerenderConnections, setRerenderConnections] = useState(false);
  const [connectionData, setConnectionData] = useState([]);
  const [isViewMode, setIsViewMode] = useState(true);
  const [isCreateReportMapMode, setIsCreateReportMapMode] = useState(false);
  const [isConnectionMode, setIsConnectionMode] = useState(false);
  const [isEditingReportMode, setIsEditingReportMode] = useState(false);
  const [newReportCoordinates, setNewReportCoordinates] = useState(initialReportCoords);
  const [rerenderReports, setRerenderReports] = useState(false);
  const [activeTile, setActiveTile] = useState(null);
  const [importedConnections, setImportedConnections] = useState([]);
  const [importedReports, setImportedReports] = useState([]);
  const [openReportContent, setOpenReportContent] = useState(null);
  const [tiles, setTiles] = useState([]);
  const [rerenderTiles, setRerenderTiles] = useState(false);
  const [connectedStopIds, setConnectedStopIds] = useState(null);
  const [connectedStopVisibility, setConnectedStopVisibility] = useState('Visible');
  const [connectionLineVisbility, setConnectionLineVisbility] = useState('Visible');
  const [areManageReportButtonsVisible, setAreManageReportButtonsVisible] = useState(false);

  const singleTileToggle = isActive => {
    setIsTileActive(isActive);
    setAreStopsVisible(isActive);
    viewModeToggle();
  };

  const viewModeToggle = () => {
    if (!isViewMode) {
      setIsViewMode(true);
      setIsCreateReportMapMode(false);
      setIsConnectionMode(false);
    }
  };

  const reportModeToggle = () => {
    if (!isCreateReportMapMode) {
      setIsViewMode(false);
      setIsCreateReportMapMode(true);
      setIsConnectionMode(false);
      setIsEditingReportMode(false);
      setOpenReportContent(null);
    }
  };

  const connectionModeToggle = () => {
    if (!isConnectionMode) {
      setIsViewMode(false);
      setIsCreateReportMapMode(false);
      setIsConnectionMode(true);
      setIsEditingReportMode(false);
      setOpenReportContent(null);
    }
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

  const resetMapContext = () => {
    setIsTileActive(false);
    setAreStopsVisible(false);
    setConnectionData([]);
    setPropertyGrid(null);
    setIsViewMode(true);
    setIsCreateReportMapMode(false);
    setIsConnectionMode(false);
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
        isViewMode,
        isCreateReportMapMode,
        isConnectionMode,
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
        viewModeToggle,
        reportModeToggle,
        connectionModeToggle,
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
