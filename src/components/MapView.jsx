import 'leaflet/dist/leaflet.css';
import React, {useContext, useEffect, useState} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import api from '../api/apiInstance';
import {basicHeaders} from '../config/apiConfig';
import {NotificationActions} from '../redux/actions/notificationActions';
import {unsafeApiError} from '../utilities/utilities';
import {MapContext} from './contexts/MapContextProvider';
import ImportedConnections from './mapComponents/ImportedConnections';
import ImportedReports from './mapComponents/ImportedReports';
import MapTiles from './mapComponents/MapTiles';
import NewConnections from './mapComponents/NewConnections';
import NewReportMarker from './mapComponents/NewReportMarker';
import TileStops from './mapComponents/TileStops';

export const MapView = () => {
  const {t} = useTranslation();
  const [tiles, setTiles] = useState([]);
  const [allStops, setAllStops] = useState([]);
  const [activeBusStopId, setActiveBusStopId] = useState(null);

  const currentLocation = {lat: 50.29, lng: 19.01};
  const zoom = 10;
  const maxZoom = 19;

  const mapStyle = {
    position: 'relative',
    height: 'calc(100vh - 138px)',
  };

  const {
    activeMapToggle,
    showSingleTile,
    singleTileToggle,
    areStopsVisible,
    isViewMode,
    isConnectionMode,
    isReportMapMode,
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
    importedConnections,
    setImportedConnections,
    importedReports,
    setImportedReports,
  } = useContext(MapContext);

  useEffect(() => {
    activeMapToggle(true);
    return () => {
      activeMapToggle(false);
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.tileGetTilesList({
          headers: basicHeaders(),
        });
        setTiles(response.data);
      } catch (error) {
        unsafeApiError(error, 'Undefined tile problem');
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (activeTile && activeTile.id) {
      getTileStops(activeTile.id);
      getTileConnections(activeTile.id);
      getTileReports(activeTile.id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTile]);

  useEffect(() => {
    if (!showSingleTile) {
      setActiveTile({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSingleTile]);

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

  const addReportMarker = e => {
    const coords = {lat: e.latlng.lat, lon: e.latlng.lng};
    setNewReportCoordinates(coords);
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

  const getTileStops = async id => {
    try {
      const response = await api.tileGetStopsDetail(id, {
        headers: basicHeaders(),
      });
      setAllStops(response.data);
      singleTileToggle(true);
    } catch (error) {
      unsafeApiError(error, 'Undefined bus stops problem');
    }
  };

  const getTileConnections = async id => {
    try {
      const response = await api.connectionsDetail(id, {
        headers: basicHeaders(),
      });
      setImportedConnections(response.data);
    } catch (error) {
      unsafeApiError(error, 'Undefined tile connection problem');
    }
  };

  const getTileReports = async id => {
    try {
      const response = await api.notesDetail(id, {
        headers: basicHeaders(),
      });
      setImportedReports(response.data);
    } catch (error) {
      unsafeApiError(error, 'Undefined tile connection problem');
    }
  };

  const isActiveStopClicked = clickedStopId => {
    return activeBusStopId === clickedStopId;
  };

  const clickBusStop = stop => {
    setActiveBusStopId(stop === undefined ? null : stop.id);
    displayPropertyGrid(stop === undefined ? null : stop);
  };

  return (
    <MapContainer center={currentLocation} zoom={zoom} maxZoom={maxZoom} style={mapStyle}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={maxZoom}
      />
      <NewConnections connections={connectionData} showSingleTile={showSingleTile} />
      <ImportedConnections
        stops={allStops}
        importedConnections={importedConnections}
        shouldRenderConnections={shouldRenderConnections}
      />
      <MapTiles
        showSingleTile={showSingleTile}
        tiles={tiles}
        activeTile={activeTile}
        setActiveTile={setActiveTile}
        isReportMapMode={isReportMapMode}
        addReportMarker={addReportMarker}
      />
      <TileStops
        areStopsVisible={areStopsVisible}
        stops={allStops}
        createConnection={createConnection}
        isActiveStopClicked={isActiveStopClicked}
        clickBusStop={clickBusStop}
        isConnectionMode={isConnectionMode}
        isViewMode={isViewMode}
      />
      <NewReportMarker newReportCoordinates={newReportCoordinates} />
      <ImportedReports reports={importedReports} />
    </MapContainer>
  );
};

export default MapView;
