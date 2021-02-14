import React, {Component} from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    LayersControl,
    AttributionControl,
    Rectangle,
    SVGOverlay,
    Tooltip
} from 'react-leaflet';
import {Icon} from "leaflet";
import "./mapView.scss"

import 'leaflet/dist/leaflet.css';
//import data from '../assets/BusStopsData';
//import Markers from './BusStopMarkers';

//import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconBlack from '../assets/bus_stop_icon_black.png';
import axios from "axios";
import {getDefaultHeadersWithToken} from '../config/apiConfig';
import {formError400Text} from "./utilities-texts";

const {REACT_APP_BACKEND_ALL_TILES_GET} = process.env;

const purpleOptions = {color: 'purple'}

class MapView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentLocation: {lat: 50.25, lng: 19.01},
            zoom: 12,
            markers: [[50.27011, 19.03011], [50.23011, 18.98011], [50.27311, 19.03017], [50.27351, 19.03067]],
            visiblePolylines: [],
            newPolylineStartPoint: [],
            tiles: [],
            allStops: [],
            showSingleTile: false
        };
    }

    componentDidMount() {
        const url = REACT_APP_BACKEND_ALL_TILES_GET;
        axios.get(url, {
            headers: getDefaultHeadersWithToken(localStorage.token)
        })
            .then(resp => {
                if (resp.status === 200) {
                    console.log("Tiles are fetched");
                    this.setState({tiles: resp.data});
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.showMessage(error.response.data.message)
                } else {
                    console.warn("Undefined tile problem");
                }
            });
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
            console.log("ewPolylineStartPoint.length = 1 ");
            const polylines = [...this.state.visiblePolylines, newPolyline];
            this.setState({
                visiblePolylines: polylines,
                newPolylineStartPoint: []
            });
        } else {
            this.setState({newPolylineStartPoint: newPolyline});
        }
    }

    getTileStops = (id) => {
        const url = REACT_APP_BACKEND_ALL_TILES_GET + "/" + id;
        axios.get(url, {
            headers: getDefaultHeadersWithToken(localStorage.token)
        })
            .then(resp => {
                if (resp.status === 200) {
                    console.log("Bus stops are fetched");
                    console.log(resp.data);
                    this.setState({allStops: resp.data.stops});
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.showMessage(error.response.data.message);
                } else {
                    console.warn("Undefined bus stops problem");
                }
            });


    }

    showPropertyGrid = () => {

    }

    render() {
      let busStopIconBlack = new Icon({
            iconUrl: iconBlack,
            shadowUrl: iconShadow,
            iconSize: [70, 65],
            iconAnchor: [35, 55],
            shadowSize: [68, 60],
            shadowAnchor: [-10, 55]
        });

        let busStopIconPurple = new Icon({
            iconUrl: iconBlack,
            shadowUrl: iconShadow,
            iconSize: [70, 65],
            iconAnchor: [35, 55],
            shadowSize: [68, 60],
            shadowAnchor: [-10, 55]
        });



        const {currentLocation, zoom} = this.state;

        return (

            <div className="map-container">

                <MapContainer center={currentLocation} zoom={zoom}>
                    onClick={this.addMarker}
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    {this.state.visiblePolylines.map((position, index) =>
                        <Polyline pathOptions={purpleOptions} positions={position}/>
                    )}
                    {this.state.tiles.map((tile, index) => (
                        <Rectangle bounds={[[tile.maxLat, tile.maxLon], [tile.minLat, tile.minLon]]}
                                   pathOptions={{color: 'black'}} eventHandlers={{
                            click: () => {
                                this.getTileStops(tile.id);
                            },
                        }}>
                            <Tooltip direction="top">x ={tile.x}, y={tile.y}</Tooltip>
                        </Rectangle>
                    ))}

                    {this.state.allStops.map((busStop) =>
                        <Marker key={busStop.id} position={[busStop.lat, busStop.lon]} icon={busStopIconBlack}
                                eventHandlers={{
                                    click: (e) => {
                                        if (this.props.canConnectBusStops === true) {
                                            this.connectPointer(e);
                                        } else {
                                            this.showPropertyGrid(busStop);
                                        }
                                    },
                                }}>
                    <Tooltip direction="top">{busStop.name} {busStop.number}</Tooltip>
                        </Marker>
                    )}

                </MapContainer>
            </div>

        );
    }
}

export default MapView;