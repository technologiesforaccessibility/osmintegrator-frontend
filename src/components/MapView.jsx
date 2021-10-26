import 'leaflet/dist/leaflet.css';
import '../stylesheets/mapView.scss';
import {useContext, useEffect, useState} from 'react';
import {MapContainer, TileLayer, Pane} from 'react-leaflet';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import api from '../api/apiInstance';
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
import ConversationContextProvider, {ConversationContext} from './contexts/ConversationProvider';

export const MapView = () => {
  const {t} = useTranslation();
  const [allStops, setAllStops] = useState([]);
  const [activeBusStopId, setActiveBusStopId] = useState(null);
  const [modal, setModal] = useState(false);
  const [welcomeModalCookie, setWelcomeModalCookie] = useCookies(['welcome_modal']);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const currentLocation = {lat: 50.29, lng: 19.01};
  const zoom = 10;
  const maxZoom = 19;

  const mapStyle = {
    position: 'relative',
    height: 'calc(100vh - 5rem)',
  };

  const modalBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'white',
    border: '0px solid #000',
    boxShadow: 24,
    p: 4,
  };

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
    setActiveStop,
  } = useContext(MapContext);

  useEffect(() => {
    activeMapToggle(true);
    return () => {
      activeMapToggle(false);
    };
  });

  const {setGeoConversations, setStopConversations, reload, stopConversations, geoConversations} =
    useContext(ConversationContext);

  useEffect(() => {
    getAvailableTiles();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeTile && activeTile.id) {
      setIsLoading(true);
      getTileStops(activeTile.id);
      getTileConnections(activeTile.id);
      getTileReports(activeTile.id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTile]);

  useEffect(() => {
    if (activeTile && activeTile.id) {
      getTileConversations(activeTile.id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTile, reload]);

  useEffect(() => {
    if (activeTile && activeTile.id) {
      getTileStops(activeTile.id, false);
      getTileReports(activeTile.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTile, stopConversations, geoConversations]);

  useEffect(() => {
    if (!isTileActive) {
      setActiveTile(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTileActive]);

  useEffect(() => {
    async function getConnections() {
      await getTileConnections(activeTile.id);
      shouldRenderConnections(false);
    }
    if (rerenderConnections) {
      getConnections();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerenderConnections]);

  useEffect(() => {
    async function getReports() {
      await getTileReports(activeTile.id);
      setRerenderReports(false);
    }
    if (rerenderReports) {
      getReports();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerenderReports]);

  useEffect(() => {
    async function getTiles() {
      await getAvailableTiles();
      setRerenderTiles(false);
    }
    if (rerenderTiles) {
      getTiles();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerenderTiles]);

  async function getAvailableTiles() {
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
  }

  const addReportMarker = e => {
    const coords = {lat: e.latlng.lat, lon: e.latlng.lng};
    setNewReportCoordinates(coords);
    setActiveStop(null);
  };

  const createConnection = (coordinates, id, stopType, name, ref) => {
    if (connectionData.length < 2) {
      const isOsm = stopType === 0;
      const entryPoint = {coordinates, id, isOsm, name, ref};

      if (connectionData.length === 1 && !(connectionData[0].isOsm ^ isOsm)) {
        if (connectionData[0].id !== id) {
          dispatch(NotificationActions.error(t('connection.differentTypeError')));
        }
        return;
      }
      updateConnectionData(entryPoint);
    }
  };

  const getTileStops = async (id, toggleTile = true) => {
    try {
      const response = await api.tileGetStopsDetail(id, {
        headers: basicHeaders(),
      });

      const stops = response.data.map(stop => {
        const stopWithReport = stopConversations.filter(report => report.stopId === stop.id);

        if (
          stopWithReport.length > 0 &&
          stopWithReport[0].messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).at(-1).status === 0
        ) {
          return {...stop, hasReport: 1};
        } else {
          return stop;
        }
      });
      setAllStops(stops);
      if (toggleTile) {
        singleTileToggle(true);
      }
    } catch (error) {
      exception(error);
    }
    setIsLoading(false);
  };

  const getTileConnections = async id => {
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
  };

  const getTileConversations = async tileID => {
    try {
      const response = await api.conversationDetail(tileID, {
        headers: basicHeaders(),
      });
      setGeoConversations(response.data.geoConversations);
      setStopConversations(response.data.stopConversations);
    } catch (error) {
      exception(error);
    }
  };

  const getConnectedStopsIds = connectionArray => {
    return connectionArray
      .filter(con => !con.approved)
      .map(({gtfsStopId, osmStopId}) => [gtfsStopId, osmStopId])
      .flat();
  };

  const getApprovedStopsIds = connectionArray => {
    return connectionArray
      .filter(con => con.approved)
      .map(({gtfsStopId, osmStopId}) => [gtfsStopId, osmStopId])
      .flat();
  };

  const getTileReports = async id => {
    try {
      const response = await api.conversationDetail(id, {
        headers: basicHeaders(),
      });
      setImportedReports(response.data.geoConversations);
    } catch (error) {
      exception(error);
    }
  };

  const isActiveStopClicked = clickedStopId => {
    return activeBusStopId === clickedStopId;
  };

  const clickBusStop = stop => {
    setActiveBusStopId(stop === undefined ? null : stop.id);
    displayPropertyGrid(stop === undefined ? null : stop);
    setOpenReportContent(null);
    setAreManageReportButtonsVisible(false);
  };

  const closeModal = checkbox => {
    if (checkbox === true) {
      setModal(false);
      setWelcomeModalCookie('welcome_modal', 'true', {path: '/'});
    }
    setModal(false);
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <MapContainer center={currentLocation} zoom={zoom} maxZoom={maxZoom} style={mapStyle}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={maxZoom}
        />
        <Pane name="connections">
          <NewConnections connections={connectionData} isTileActive={isTileActive} />
          <ImportedConnections stops={allStops} inApproveMode={(authRoles || []).includes(roles.SUPERVISOR)} />
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
          stops={allStops}
          createConnection={createConnection}
          isActiveStopClicked={isActiveStopClicked}
          clickBusStop={clickBusStop}
          isConnectionMode={mapMode === MapModes.connection}
          isViewMode={mapMode === MapModes.view}
          isReportMode={mapMode === MapModes.report}
        />
        <NewReportMarker newReportCoordinates={newReportCoordinates} />
        <ImportedReports reports={importedReports} />
      </MapContainer>
      {modal && !welcomeModalCookie.welcome_modal && (
        <Modal open={modal} onClose={closeModal}>
          <Box sx={modalBoxStyle}>
            <WelcomeModal handleClose={closeModal} />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default MapView;
