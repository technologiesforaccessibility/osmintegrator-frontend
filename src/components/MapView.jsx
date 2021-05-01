import React, {useContext, useEffect, useState} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';

import NewConnections from './mapComponents/NewConnections';
import ImportedConnections from './mapComponents/ImportedConnections';
import MapTiles from './mapComponents/MapTiles';
import TileStops from './mapComponents/TileStops';
import {MapContext} from './contexts/MapContextProvider';
import {basicHeaders} from '../config/apiConfig';
import client from '../api/apiInstance';

import '../stylesheets/mapView.scss';
import 'leaflet/dist/leaflet.css';
import {unsafeApiError} from '../utilities/utilities';

export const MapView = () => {
    const currentLocation = {lat: 50.29, lng: 19.01};
    const zoom = 10;
    const maxZoom = 19;

    const [userConnections, setUserConnections] = useState([
        [
            {coordinates: [50.51534, 18.474294], isOsm: false},
            {coordinates: [50.511202, 18.481637], isOsm: false},
        ],
    ]);
    const [newPolylineStartPoint, setNewPolylineStartPoint] = useState({});
    const [tiles, setTiles] = useState([]);
    const [allStops, setAllStops] = useState([]);
    const [activeTile, setActiveTile] = useState({});
    const [activeBusStopId, setActiveBusStopId] = useState(null);
    const [importedConnections, setImportedConnections] = useState([]);
    const [preSavedConnection, setPreSavedConnection] = useState(null);

    const {
        activeMapToggle,
        showSingleTile,
        singleTileToggle,
        areStopsVisible,
        isConnectionMode,
        addConnectionPromptName,
        displayPropertyGrid,
        updateConnectionData,
        updateConnectionInfo,
        connectionInfo,
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
    }, [activeTile]);

    useEffect(() => {
        if (!showSingleTile) {
            setActiveTile({});
        }
    }, [showSingleTile]);

    useEffect(() => {
        if (preSavedConnection) {
            updateConnectionData(preSavedConnection);
        }
    }, [preSavedConnection]);

    // addMarker = (e) => {
    //     const {markers} = this.state
    //     markers.push(e.latlng)
    //     this.setState({markers})
    // }ks

    const createConnection = (stop, id, stopType, name, ref) => {
        const coordinates = [stop._latlng.lat, stop._latlng.lng];
        const isOsm = stopType === 0;
        const entryPoint = {coordinates, isOsm, name, ref, id};

        if (newPolylineStartPoint.coordinates) {
            if (newPolylineStartPoint.isOsm === isOsm) {
                updateConnectionInfo("Stops mustn't be the same kind!");
                return;
            }
            if (connectionInfo) {
                updateConnectionInfo(null);
            }
            const newConnection = [newPolylineStartPoint, entryPoint];
            setUserConnections(oldState => [...oldState, newConnection]);
            setNewPolylineStartPoint({});
            setPreSavedConnection(newConnection);
            addConnectionPromptName(
                `${name === undefined ? id : name.toString()} ${
                    ref === undefined ? '' : ref.toString()
                }`,
            );
        } else {
            setNewPolylineStartPoint(entryPoint);
            addConnectionPromptName(
                `${name === undefined ? id : name.toString()} ${
                    ref === undefined ? '' : ref.toString()
                }`,
            );
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
        <MapContainer center={currentLocation} zoom={zoom} maxZoom={maxZoom}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                maxZoom={maxZoom}
            />
            <NewConnections
                connections={userConnections}
                showSingleTile={showSingleTile}
            />
            <ImportedConnections
                stops={allStops}
                importedConnections={importedConnections}
            />
            <MapTiles
                showSingleTile={showSingleTile}
                tiles={tiles}
                activeTile={activeTile}
                setActiveTile={setActiveTile}
            />
            <TileStops
                areStopsVisible={areStopsVisible}
                stops={allStops}
                createConnection={createConnection}
                isActiveStopClicked={isActiveStopClicked}
                clickBusStop={clickBusStop}
                isConnectionMode={isConnectionMode}
            />
        </MapContainer>
    );
};

export default MapView;
