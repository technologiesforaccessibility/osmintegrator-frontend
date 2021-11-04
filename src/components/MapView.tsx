import 'leaflet/dist/leaflet.css';
import '../stylesheets/mapView.scss';
import {useCallback, useContext, useEffect, useState} from 'react';
import {MapContainer, TileLayer, Pane} from 'react-leaflet';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import api from '../api/apiInstance';
import {Connection, Conversation, Stop} from '../api/apiClient';
import {basicHeaders} from '../config/apiConfig';
import {NotificationActions} from '../redux/actions/notificationActions';
import {MapContext, MapModes} from './contexts/MapContextProvider';
import ImportedConnections from './mapComponents/ImportedConnections';
import ImportedReports from './mapComponents/ImportedReports';
import MapTiles from './mapComponents/MapTiles';
import NewConnections from './mapComponents/NewConnections';
import NewReportMarker from './mapComponents/NewReportMarker';
import TileStops from './mapComponents/TileStops';
import {exception} from '../utilities/exceptionHelper';
import Loader from './Loader';
import {Modal} from '@mui/material';
import {Box} from '@mui/system';
import WelcomeModal from './WelcomeModal';
import {useCookies} from 'react-cookie';
import {roles} from '../utilities/constants';
import {LeafletMouseEvent} from 'leaflet';
import {ConversationContext} from './contexts/ConversationProvider';
import Legend from './mapComponents/Legend';

export const MapView = () => {
  const {t} = useTranslation();
  const [activeBusStopId, setActiveBusStopId] = useState<string | null>(null);
  const [modal, setModal] = useState(false);
  const [welcomeModalCookie, setWelcomeModalCookie] = useCookies(['welcome_modal']);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const currentLocation = {lat: 50.29, lng: 19.01};
  const zoom = 10;
  const maxZoom = 19;

  const {
    tiles,
    setTiles,
    rerenderTiles,
    setRerenderTiles,
    activeMapToggle,
    isTileActive,
    singleTileToggle,
    mapMode,
    displayPropertyGrid,
    updateConnectionData,
    connectionData,
    rerenderConnections,
    shouldRenderConnections,
    setNewReportCoordinates,
    newReportCoordinates,
    activeTile,
    setActiveTile,
    rerenderReports,
    setRerenderReports,
    setImportedConnections,
    importedReports,
    setImportedReports,
    setOpenReportContent,
    setConnectedStopIds,
    setApprovedStopIds,
    setAreManageReportButtonsVisible,
    authRoles,
    tileStops,
    setTileStops,
    setActiveStop,
  } = useContext(MapContext);

  const {setGeoConversations, setStopConversations, reload, stopConversations, geoConversations} =
    useContext(ConversationContext);

  const getAvailableTiles = useCallback(async () => {
    try {
      const response = await api.tileGetTilesList({
        headers: basicHeaders(),
      });
      setTiles(response.data);

      const noTilesAndIsEditor =
        response.data.length === 0 && authRoles.length === 1 && (authRoles || []).includes(roles.EDITOR);
      if (noTilesAndIsEditor) {
        setModal(true);
      }
    } catch (error) {
      exception(error);
    }
    setIsLoading(false);
  }, [authRoles, setTiles]);

  const addReportMarker = (e: LeafletMouseEvent) => {
    const coords = {lat: e.latlng.lat, lon: e.latlng.lng};
    setNewReportCoordinates(coords);
    setActiveStop(null);
  };

  const createConnection = (
    coordinates: {lat: number; lon: number},
    id: string,
    stopType: number,
    name: string,
    ref: string,
  ) => {
    if (connectionData.length < 2) {
      const isOsm = stopType === 0;
      const entryPoint = {coordinates, id, isOsm, name, ref};

      if (connectionData.length === 1 && connectionData[0].isOsm === isOsm) {
        if (connectionData[0].id !== id) {
          dispatch(NotificationActions.error(t('connection.differentTypeError')));
        }
        return;
      }
      updateConnectionData(entryPoint);
    }
  };

  const getTileStops = useCallback(
    async (id: string, toggleTile = true) => {
      try {
        const response = await api.tileGetStopsDetail(id, {
          headers: basicHeaders(),
        });
        const stops = response.data.map(stop => {
          const stopWithReport = stopConversations.filter((report: Conversation) => report.stopId === stop.id);

          if (stopWithReport.length > 0 && stopWithReport[0].status === 1) {
            return {...stop, hasReport: 1, reportApproved: 1};
          }
          if (stopWithReport.length > 0) {
            return {...stop, hasReport: 1, reportApproved: 0};
          }
          return stop;
        });
        setTileStops(stops);
        if (toggleTile) {
          singleTileToggle(true);
        }
      } catch (error) {
        exception(error);
      }
      setIsLoading(false);
    },
    [singleTileToggle, stopConversations, setTileStops],
  );

  const getTileConnections = useCallback(
    async id => {
      try {
        const response = await api.connectionsDetail(id, {
          headers: basicHeaders(),
        });
        setImportedConnections(response.data);
        setConnectedStopIds(getConnectedStopsIds(response.data));
        setApprovedStopIds(getApprovedStopsIds(response.data));
      } catch (error) {
        exception(error);
      }
    },
    [setApprovedStopIds, setConnectedStopIds, setImportedConnections],
  );

  const getTileConversations = useCallback(
    async tileID => {
      try {
        const response = await api.conversationDetail(tileID, {
          headers: basicHeaders(),
        });
        setGeoConversations(response.data.geoConversations);
        setStopConversations(response.data.stopConversations);
      } catch (error) {
        exception(error);
      }
    },
    [setGeoConversations, setStopConversations],
  );

  const getConnectedStopsIds = (connectionArray: Array<Connection>) => {
    return connectionArray
      .filter(con => !con.approved && con.gtfsStopId && con.osmStopId)
      .map(({gtfsStopId, osmStopId}) => [gtfsStopId || '', osmStopId || ''])
      .flat();
  };

  const getApprovedStopsIds = (connectionArray: Array<Connection>) => {
    return connectionArray
      .filter(con => con.approved && con.gtfsStopId && con.osmStopId)
      .map(({gtfsStopId, osmStopId}) => [gtfsStopId || '', osmStopId || ''])
      .flat();
  };

  const getTileReports = useCallback(
    async id => {
      try {
        const response = await api.conversationDetail(id, {
          headers: basicHeaders(),
        });
        if (response.data.geoConversations) {
          setImportedReports(response.data.geoConversations);
        }
      } catch (error) {
        exception(error);
      }
    },
    [setImportedReports],
  );

  const isActiveStopClicked = (clickedStopId: string) => {
    return activeBusStopId === clickedStopId;
  };

  const clickBusStop = (stop: Stop) => {
    setActiveBusStopId(stop?.id || null);
    displayPropertyGrid(stop || null);
    setOpenReportContent(null);
    setAreManageReportButtonsVisible(false);
  };

  const closeModal = (checkbox: boolean) => {
    if (checkbox === true) {
      setModal(false);
      setWelcomeModalCookie('welcome_modal', 'true', {path: '/'});
    }
    setModal(false);
  };

  useEffect(() => {
    activeMapToggle(true);
    return () => {
      activeMapToggle(false);
    };
  });

  useEffect(() => {
    getAvailableTiles();
  }, [getAvailableTiles]);

  useEffect(() => {
    if (activeTile && activeTile.id && !reload) {
      setIsLoading(true);
      getTileStops(activeTile.id);
      getTileConnections(activeTile.id);
      getTileReports(activeTile.id);
    }
  }, [activeTile, getTileConnections, getTileReports, getTileStops, reload]);

  useEffect(() => {
    if (activeTile && activeTile.id) {
      getTileConversations(activeTile.id);
    }
  }, [activeTile, getTileConversations, reload]);

  useEffect(() => {
    if (activeTile && activeTile.id) {
      getTileStops(activeTile.id, false);
      getTileReports(activeTile.id);
    }
  }, [activeTile, stopConversations, geoConversations, getTileStops, getTileReports]);

  useEffect(() => {
    if (!isTileActive) {
      setActiveTile(null);
    }
  }, [isTileActive, setActiveTile]);

  useEffect(() => {
    async function getConnections() {
      await getTileConnections(activeTile?.id);
      shouldRenderConnections(false);
    }
    if (rerenderConnections) {
      getConnections();
    }
  }, [activeTile, getTileConnections, rerenderConnections, shouldRenderConnections]);

  useEffect(() => {
    async function getReports() {
      await getTileReports(activeTile?.id);
      setRerenderReports(false);
    }
    if (rerenderReports) {
      getReports();
    }
  }, [activeTile, getTileReports, rerenderReports, setRerenderReports]);

  useEffect(() => {
    async function getTiles() {
      await getAvailableTiles();
      setRerenderTiles(false);
    }
    if (rerenderTiles) {
      getTiles();
    }
  }, [getAvailableTiles, rerenderTiles, setRerenderTiles]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <MapContainer
        center={currentLocation}
        zoom={zoom}
        maxZoom={maxZoom}
        style={{
          position: 'relative',
          height: 'calc(100vh - 5rem)',
        }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={maxZoom}
        />
        <Pane name="connections">
          <NewConnections connections={connectionData} isTileActive={isTileActive} />
          <ImportedConnections
            stops={tileStops}
            inApproveMode={(authRoles || []).includes(roles.SUPERVISOR) && !!activeTile?.approvedByEditor}
          />
        </Pane>
        <MapTiles
          isTileActive={isTileActive}
          tiles={tiles}
          activeTile={activeTile}
          setActiveTile={setActiveTile}
          isCreateReportMapMode={mapMode === MapModes.report}
          addReportMarker={addReportMarker}
        />
        <TileStops
          createConnection={createConnection}
          isActiveStopClicked={isActiveStopClicked}
          clickBusStop={clickBusStop}
          isConnectionMode={mapMode === MapModes.connection}
          isViewMode={mapMode === MapModes.view}
          isReportMode={mapMode === MapModes.report}
        />
        <NewReportMarker newReportCoordinates={newReportCoordinates} />
        <ImportedReports reports={importedReports} resetActiveStop={() => setActiveBusStopId(null)} />
        <Legend />
      </MapContainer>
      {modal && !welcomeModalCookie.welcome_modal && (
        <Modal open={modal} onClose={closeModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              bgcolor: 'white',
              border: '0px solid #000',
              boxShadow: 24,
              p: 4,
            }}>
            <WelcomeModal handleClose={closeModal} />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default MapView;
