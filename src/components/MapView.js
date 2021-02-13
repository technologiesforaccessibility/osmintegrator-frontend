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
import icon2 from '../assets/bus_stop_icon_black.png';
import axios from "axios";
import {postDefaultHeaders} from "../config/apiConfig";
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
            osmStops: [],
            ztmStops: [],
            tiles: []
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
        console.log(coordinates);
        console.log(newPolyline);
        if (this.state.newPolylineStartPoint.length === 1) {
            console.log("ewPolylineStartPoint.length = 1 ");
            const polylines = [...this.state.visiblePolylines, newPolyline];
            this.setState({
                visiblePolylines: polylines,
                newPolylineStartPoint: []
            });
        } else {
            console.log("ewPolylineStartPoint.length = 0 ");
            this.setState({newPolylineStartPoint: newPolyline});
        }
    }

    render() {
        let busStopPointerBlackIcon2 = new Icon({
            iconUrl: icon2,
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
                        <Rectangle key={tile.id} bounds={[[tile.maxLat, tile.maxLon], [tile.minLat, tile.minLon]]}
                                   pathOptions={{color: 'black'}}>
                            <Tooltip direction="top" >x ={tile.x}, y={tile.y}</Tooltip>
                        </Rectangle>
                    ))}

                    {this.state.markers.map((position, idx) =>
                        <Marker key={`marker-${idx}`} position={position} icon={busStopPointerBlackIcon2}
                                eventHandlers={{
                                    click: (e) => {
                                        if (this.props.canConnectBusStops === true) {
                                            this.connectPointer(e);
                                        }
                                        console.log(e.target._latlng);
                                    },
                                }}>

                        </Marker>
                    )}
                </MapContainer>
            </div>

        );
    }
}

export default MapView;