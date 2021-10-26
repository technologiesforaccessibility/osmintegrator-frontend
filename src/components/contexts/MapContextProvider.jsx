import {createContext, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectLoggedInUserRoles} from '../../redux/selectors/authSelector';
import i18n from '../../translations/i18n';
import {connectionVisibility, localStorageStopTypes} from '../../utilities/constants';

export const MapContext = createContext();

export const MapModes = {
  view: 'View',
  report: 'Report',
  connection: 'Connection',
};

const initialReportCoords = {lat: null, lon: null};

const getValueFromStateOrReturn = (itemKey, reset) => {
  const storageItem = localStorage.getItem(itemKey);

  if (storageItem && !reset) {
    //good for now - can be rafactored later
    const connectionVisibilityKey = Object.entries(connectionVisibility).filter(
      el => el[1].text === JSON.parse(storageItem).text,
    )[0][0];

    return connectionVisibility[connectionVisibilityKey];
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
  const [approvedStopIds, setApprovedStopIds] = useState([]);
  const [areManageReportButtonsVisible, setAreManageReportButtonsVisible] = useState(false);
  const [visibilityOptions, setVisibilityOptions] = useState(initialVisibility());
  const [activeStop, setActiveStop] = useState(null);

  const authRoles = useSelector(selectLoggedInUserRoles);

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
    setConnectedStopIds([]);
    setApprovedStopIds([]);
    setVisibilityOptions(initialVisibility);
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
        activeStop,
        setActiveStop,
      }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapContextProvider;
