import React, {useContext, useEffect, useState} from 'react';
import {
    MapContainer,
    TileLayer,
} from 'react-leaflet';
import NewConnections from './mapComponents/NewConnections';

import client from '../api/apiInstance';
import {MapContext} from './contexts/MapContextProvider';
import {getDefaultHeadersWithToken} from '../config/apiConfig';


import '../stylesheets/mapView.scss';
import 'leaflet/dist/leaflet.css';
import ImportedConnections from './mapComponents/ImportedConnections';
import MapTiles from './mapComponents/MapTiles';
import TileStops from './mapComponents/TileStops';

export const MapView = ({setPropertyGrid}) => {
    const currentLocation = {lat: 50.29, lng: 19.01};
    const zoom = 10;
    const maxZoom = 19;


    const [visiblePolylines, setVisiblePolylines] = useState([]);
    const [newPolylineStartPoint, setNewPolylineStartPoint] = useState([]);
    const [tiles, setTiles] = useState([]);
    const [allStops, setAllStops] = useState([]);
    const [activeTile, setActiveTile] = useState([]);
    const [activeBusStopId, setActiveBusStopId] = useState(null);
    const [importedConnections, setImportedConnections] = useState([]);

    const {
        activeMapToggle,
        showSingleTile,
        singleTileToggle,
        areStopsVisible,
        isConnectionMode,
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
                    headers: getDefaultHeadersWithToken(localStorage.token),
                });
                setTiles(response.data);
            } catch (error) {
                if (error.status === 401) {
                    console.log('Authentication problem');
                } else {
                    console.warn('Undefined tile problem');
                }
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (activeTile !== []) {
            getTileStops(activeTile.id);
            getTileConnections(activeTile.id);
        }
    }, [activeTile]);

    // addMarker = (e) => {
    //     const {markers} = this.state
    //     markers.push(e.latlng)
    //     this.setState({markers})
    // }

    const connectPointer = e => {
        const coordinates = [e.target._latlng.lat, e.target._latlng.lng];
        const newPolyline = [...newPolylineStartPoint, coordinates];
        if (newPolylineStartPoint.length === 1) {
            const polylines = [...visiblePolylines, newPolyline];
            setVisiblePolylines(polylines);
            setNewPolylineStartPoint([]);
        } else {
            setNewPolylineStartPoint(newPolyline);
        }
    };

    const getTileStops = async id => {
        try {
            const response = await client.api.tileGetStopsDetail(id, {
                headers: getDefaultHeadersWithToken(localStorage.token),
            });
            if (response.status === 200) {
                setAllStops(response.data);
                singleTileToggle(true);
            }
        } catch (error) {
            if (error.status === 401) {
                console.log('Tile problem');
            } else {
                console.warn('Undefined bus stops problem');
            }
        }
    };

    const getTileConnections = async id => {
        try {
            const response = await client.api.connectionsDetail(id, {
                headers: getDefaultHeadersWithToken(localStorage.token),
            });
            if (response.status === 200) {
                console.log(response.data);
                console.log(allStops);
                setImportedConnections(response.data);
            }
        } catch (error) {
            if (error.status === 401) {
                console.log('Authorization problem');
            } else {
                console.warn('Undefined tile connection problem');
            }
        }
    };

    const isActiveStopClicked = clickedStopId => {
        return activeBusStopId === clickedStopId;
    };

    const clickBusStop = gridProperties => {
        console.log('property grid type: ', typeof gridProperties);
        console.log(gridProperties);
        setActiveBusStopId(gridProperties.id);
        setPropertyGrid(gridProperties);
    };

    const unclickBusStop = () => {
        this.setState({activeBusStopId: null});
        setActiveBusStopId(null);
        setPropertyGrid(null);
    };


    return (
        <MapContainer center={currentLocation} zoom={zoom} maxZoom={maxZoom}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                maxZoom={maxZoom}
            />
            <NewConnections polylines={visiblePolylines} />
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
                connectPointer={connectPointer}
                isActiveStopClicked={isActiveStopClicked}
                clickBusStop={clickBusStop}
                unclickBusStop={unclickBusStop}
                isConnectionMode={isConnectionMode}
            />
        </MapContainer>
    );
};

export default MapView;
