import React, {createContext, useState} from 'react';

export const MapContext = createContext();

const MapContextProvider = ({children}) => {
  const [showSingleTile, setShowSingleTile] = useState(false);

  const [isMapActive, setIsMapActive] = useState(false);
  const [areStopsVisible, setAreStopsVisible] = useState(false);

  const [propertyGrid, setPropertyGrid] = useState(null);
  const [rerenderConnections, setRerenderConnections] = useState(false);

  const [connectionSidePanelMessage, setConnectionSidePanelMessage] = useState(null);
  const [connectionData, setConnectionData] = useState([]);

  const [isViewMode, setIsViewMode] = useState(true);
  const [isReportMapMode, setIsReportMapMode] = useState(false);
  const [isConnectionMode, setIsConnectionMode] = useState(false);

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
    }
  };

  const connectionModeToggle = () => {
    if (!isConnectionMode) {
      setIsViewMode(false);
      setIsReportMapMode(false);
      setIsConnectionMode(true);
    }
  };

  const activeMapToggle = bool => {
    setIsMapActive(bool);
  };

  const displayPropertyGrid = setPropertyGrid;

  const updateConnectionData = data => {
    if (data) {
      setConnectionData(oldState => [...oldState, data]);
    }
  };

  const updateConnectionMessage = setConnectionSidePanelMessage;

  const reset = () => {
    setConnectionData([]);
    setPropertyGrid(null);
  };

  const shouldRenderConnections = setRerenderConnections;

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
        connectionSidePanelMessage,
        connectionData,
        rerenderConnections,
        singleTileToggle,
        activeMapToggle,
        displayPropertyGrid,
        updateConnectionData,
        updateConnectionMessage,
        reset,
        shouldRenderConnections,
        viewModeToggle,
        reportModeToggle,
        connectionModeToggle,
      }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapContextProvider;
