import React, {useContext, useEffect, useState} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';

import NewConnections from './mapComponents/NewConnections';
import ImportedConnections from './mapComponents/ImportedConnections';
import MapTiles from './mapComponents/MapTiles';
import TileStops from './mapComponents/TileStops';
import NewReportMarker from './mapComponents/NewReportMarker';
import {MapContext} from './contexts/MapContextProvider';
import {basicHeaders} from '../config/apiConfig';
import client from '../api/apiInstance';

import 'leaflet/dist/leaflet.css';
import {unsafeApiError} from '../utilities/utilities';

export const MapView = () => {
  const currentLocation = {lat: 50.29, lng: 19.01};
  const zoom = 10;
  const maxZoom = 19;

  const [tiles, setTiles] = useState([]);
  const [allStops, setAllStops] = useState([]);
  const [activeTile, setActiveTile] = useState({});
  const [importedConnections, setImportedConnections] = useState([]);

  const [activeBusStopId, setActiveBusStopId] = useState(null);

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
    updateConnectionInfo,
    connectionInfo,
    connectionData,
    rerenderConnections,
    shouldRenderConnections,
    setNewReportCoordinates,
    newReportCoordinates,
  } = useContext(MapContext);

  useEffect(() => {
    activeMapToggle(true);
    return () => {
      activeMapToggle(false);
    };
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await client.api.tileGetTilesList({
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
    if (activeTile.id) {
      getTileStops(activeTile.id);
      getTileConnections(activeTile.id);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTile]);

  useEffect(() => {
    if (!showSingleTile) {
      setActiveTile({});
    }
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

  const addReportMarker = e => {
    const coords = {lat: e.latlng.lat, lon: e.latlng.lng};
    setNewReportCoordinates(coords);
  };

  const createConnection = (coordinates, id, stopType, name, ref) => {
    if (connectionData.length < 2) {
      const isOsm = stopType === 0;
      const entryPoint = {coordinates, id, isOsm, name, ref};

      if (connectionData.length === 1) {
        if (!(connectionData[0].isOsm ^ isOsm)) {
          updateConnectionInfo('Exactly one stop should be OSM type!');
          return;
        }
        connectionInfo && updateConnectionInfo(null);
      }
      updateConnectionData(entryPoint);
    }
  };

  const getTileStops = async id => {
    try {
      const response = await client.api.tileGetStopsDetail(id, {
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
      const response = await client.api.connectionsDetail(id, {
        headers: basicHeaders(),
      });
      setImportedConnections(response.data);
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
    </MapContainer>
  );
};

export default MapView;
