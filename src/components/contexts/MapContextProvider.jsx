import React, {createContext, useState} from 'react';

export const MapContext = createContext();

const initialReportCoords = {lat: null, lon: null};

const MapContextProvider = ({children}) => {
  const [showSingleTile, setShowSingleTile] = useState(false);

  const [isMapActive, setIsMapActive] = useState(false);
  const [areStopsVisible, setAreStopsVisible] = useState(false);

  const [propertyGrid, setPropertyGrid] = useState(null);
  const [rerenderConnections, setRerenderConnections] = useState(false);

  const [connectionData, setConnectionData] = useState([]);

  const [isViewMode, setIsViewMode] = useState(true);
  const [isReportMapMode, setIsReportMapMode] = useState(false);
  const [isConnectionMode, setIsConnectionMode] = useState(false);
  const [isEditingReportMode, setIsEditingReportMode] = useState(false);

  const [newReportCoordinates, setNewReportCoordinates] = useState(initialReportCoords);
  const [rerenderReports, setRerenderReports] = useState(false);

  const [activeTile, setActiveTile] = useState({});

  const [importedConnections, setImportedConnections] = useState([]);
  const [importedReports, setImportedReports] = useState([]);

  const [openReport, setOpenReport] = useState(null);

  const singleTileToggle = isActive => {
    setShowSingleTile(isActive);
    setAreStopsVisible(isActive);
    viewModeToggle();
  };

  const viewModeToggle = () => {
    if (!isViewMode) {
      setIsViewMode(true);
      setIsReportMapMode(false);
      setIsConnectionMode(false);
    }
  };

  const reportModeToggle = () => {
    if (!isReportMapMode) {
      setIsViewMode(false);
      setIsReportMapMode(true);
      setIsConnectionMode(false);
      setIsEditingReportMode(false);
      setOpenReport(null);
    }
  };

  const connectionModeToggle = () => {
    if (!isConnectionMode) {
      setIsViewMode(false);
      setIsReportMapMode(false);
      setIsConnectionMode(true);
      setIsEditingReportMode(false);
      setOpenReport(null);
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

  return (
    <MapContext.Provider
      value={{
        showSingleTile,
        isViewMode,
        isReportMapMode,
        isConnectionMode,
        isMapActive,
        areStopsVisible,
        propertyGrid,
        connectionData,
        rerenderConnections,
        singleTileToggle,
        activeMapToggle,
        displayPropertyGrid,
        updateConnectionData,
        reset,
        shouldRenderConnections,
        viewModeToggle,
        reportModeToggle,
        connectionModeToggle,
        newReportCoordinates,
        setNewReportCoordinates,
        resetReportCoordinates,
        activeTile,
        setActiveTile,
        rerenderReports,
        setRerenderReports,
        importedConnections,
        setImportedConnections,
        importedReports,
        setImportedReports,
        hideTileElements,
        isEditingReportMode,
        setIsEditingReportMode,
        openReport,
        setOpenReport,
      }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapContextProvider;
