import React, {useEffect, useState} from 'react';
import {MapContainer, Marker, Polyline, Rectangle, TileLayer, Tooltip,} from 'react-leaflet';
import '../stylesheets/mapView.scss';
import 'leaflet/dist/leaflet.css';
import {getDefaultHeadersWithToken} from '../config/apiConfig';
import {getBusStopIcon} from '../utilities/utilities';
import {getPosition} from '../utilities/mapUtilities';
import colors from '../stylesheets/colors.module.scss';

import client from '../api/apiInstance';

const purpleOptions = {color: 'purple'};
const redOptions = {color: 'red'};


export const MapView = ({setPropertyGrid, canConnectBusStops}) => {
    const currentLocation = {lat: 50.29, lng: 19.01};
    const zoom = 10;
    const [visiblePolylines, setVisiblePolylines] = useState([]);
    const [newPolylineStartPoint, setNewPolylineStartPoint] = useState([]);
    const [tiles, setTiles] = useState([]);
    const [allStops, setAllStops] = useState([]);
    const [showSingleTile, setShowSingleTile] = useState(false);
    const [activeTile, setActiveTile] = useState([]);
    const [activeBusStopId, setActiveBusStopId] = useState(null);
    const [importedConnections, setImportedConnections] = useState([]);

    useEffect( () => {
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
                setShowSingleTile(true);
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

    const mapTiles = showSingleTile ? (
        <Rectangle
            key={`${activeTile.maxLat}-${activeTile.maxLon}`}
            bounds={[
                [activeTile.maxLat, activeTile.maxLon],
                [activeTile.minLat, activeTile.minLon],
            ]}
            pathOptions={{color: colors['colorTileActive']}}
        />
    ) : (
        tiles.map(tile => (
            <Rectangle
                bounds={[
                    [tile.maxLat, tile.maxLon],
                    [tile.minLat, tile.minLon],
                ]}
                pathOptions={{color: colors['colorTileAll']}}
                eventHandlers={{
                    click: () => {
                        setActiveTile(tile);
                    },
                }}>
                <Tooltip direction="top">
                    x ={tile.x}, y={tile.y}
                </Tooltip>
            </Rectangle>
        ))
    );

    return (
        <div className="map-container">
            <MapContainer center={currentLocation} zoom={zoom} maxZoom={19}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    maxZoom={19}
                />
                {visiblePolylines.map(position => (
                    <Polyline
                        key={position.newPolylineStartPoint}
                        pathOptions={purpleOptions}
                        positions={position}
                    />
                ))}
                {allStops.length > 0 &&
                    importedConnections.map(
                        ({osmStopId, gtfsStopId}, index) => {
                            const foundOSM = allStops.find(
                                stop => stop.id === osmStopId,
                            );
                            const foundGTFS = allStops.find(
                                stop => stop.id === gtfsStopId,
                            );
                            if (
                                foundOSM !== undefined &&
                                foundGTFS !== undefined
                            ) {
                                return (
                                    <Polyline
                                        key={index}
                                        pathOptions={redOptions}
                                        positions={getPosition(
                                            foundOSM,
                                            foundGTFS,
                                        )}
                                    />
                                );
                            }
                            return <></>;
                        },
                    )}
                {mapTiles}
                {allStops.map(busStop => (
                    <Marker
                        key={busStop.id}
                        position={[busStop.lat, busStop.lon]}
                        icon={getBusStopIcon(busStop)}
                        eventHandlers={{
                            click: e => {
                                if (canConnectBusStops === true) {
                                    connectPointer(e);
                                } else {
                                    isActiveStopClicked(busStop.id)
                                        ? unclickBusStop()
                                        : clickBusStop(busStop);
                                }
                            },
                        }}>
                        <Tooltip direction="bottom">
                            {busStop.name} {busStop.number}
                        </Tooltip>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapView;
