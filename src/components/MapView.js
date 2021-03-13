import React, {Component} from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    Polyline,
    Rectangle,
    Tooltip
} from 'react-leaflet';
import "./mapView.scss"
import 'leaflet/dist/leaflet.css';
import {getDefaultHeadersWithToken} from '../config/apiConfig';
import {getBusStopIcon} from "./utilities";
import colors from './colors.module.scss';

import client from "../api/apiInstance";

const purpleOptions = {color: 'purple'}

class MapView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentLocation: {lat: 50.29, lng: 19.01},
            zoom: 10,
            visiblePolylines: [],
            newPolylineStartPoint: [],
            tiles: [],
            allStops: [],
            showSingleTile: false,
            activeTile: [],
            activeBusStopId: null,
        };

        this.getTileStops = this.getTileStops.bind(this);
    }

    async componentDidMount() {
        try {
            const response = await client.api.tileGetAllTilesList({headers: getDefaultHeadersWithToken(localStorage.token)})
            if (response.status === 200) {
                this.setState({tiles: response.data});
            }
        } catch (error) {
            if (error.status === 401) {
                console.log("Authentication problem")
            } else {
                console.warn("Undefined tile problem");
            }
        }
    }


    addMarker = (e) => {
        const {markers} = this.state
        markers.push(e.latlng)
        this.setState({markers})
    }

    connectPointer = (e) => {
        const coordinates = [e.target._latlng.lat, e.target._latlng.lng];
        const newPolyline = [...this.state.newPolylineStartPoint, coordinates];
        if (this.state.newPolylineStartPoint.length === 1) {
            const polylines = [...this.state.visiblePolylines, newPolyline];
            this.setState({
                visiblePolylines: polylines,
                newPolylineStartPoint: []
            });
        } else {
            this.setState({newPolylineStartPoint: newPolyline});
        }
    }

    async getTileStops(id) {
        try {
            const response = await client.api.tileGetStopsDetail(id, {
                headers: getDefaultHeadersWithToken(localStorage.token)

            })
            if (response.status === 200) {
                this.setState({
                    allStops: response.data,
                    showSingleTile: true
                });
            }
        } catch (error) {
            if (error.status === 401) {
                console.log("Tile problem")
            } else {
                console.warn("Undefined bus stops problem");
            }
        }
    }

    isActiveStopClicked = (clickedStopId) => {
        const activeStopId = this.state.activeBusStopId;
        return ((activeStopId === clickedStopId))
    }


    clickBusStop = (gridProperties) => {
        this.setState({activeBusStopId: gridProperties.id});
        this.props.setPropertyGrid(gridProperties);
    }

    unclickBusStop = () => {
        this.setState({activeBusStopId: null});
        this.props.setPropertyGrid(null);
    }


    render() {
        const {currentLocation, zoom} = this.state;
        const showSingleTile = this.state.showSingleTile;
        let tiles;
        if (showSingleTile) {
            tiles = <Rectangle bounds={[
                [this.state.activeTile.maxLat, this.state.activeTile.maxLon],
                [this.state.activeTile.minLat, this.state.activeTile.minLon]
            ]}
                               pathOptions={{color: colors['colorTileActive']}}/>;
        } else {
            tiles = this.state.tiles.map((tile) => (
                <Rectangle bounds={[[tile.maxLat, tile.maxLon], [tile.minLat, tile.minLon]]}
                           pathOptions={{color: colors['colorTileAll']}} eventHandlers={{
                    click: () => {
                        this.setState({activeTile: tile},
                            () => {this.getTileStops(tile.id)})
                    },
                }}>
                    <Tooltip direction="top">x ={tile.x}, y={tile.y}</Tooltip>
                </Rectangle>
            ));
        }

        return (

            <div className="map-container">

                <MapContainer center={currentLocation} zoom={zoom} maxZoom={19}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        maxZoom={19}
                    />
                    {this.state.visiblePolylines.map((position) =>
                        <Polyline pathOptions={purpleOptions} positions={position}/>
                    )}
                    {tiles}
                    {this.state.allStops.map((busStop) =>
                        <Marker key={busStop.id} position={[busStop.lat, busStop.lon]} icon={getBusStopIcon(busStop)}
                                eventHandlers={{
                                    click: (e) => {
                                        if (this.props.canConnectBusStops === true) {
                                            this.connectPointer(e);
                                        } else {
                                            (this.isActiveStopClicked(busStop.id) ? this.unclickBusStop() : this.clickBusStop(busStop));
                                        }
                                    },
                                }}>
                            <Tooltip direction="bottom">{busStop.name} {busStop.number}</Tooltip>
                        </Marker>
                    )}

                </MapContainer>
            </div>

        );
    }
}

export default MapView;