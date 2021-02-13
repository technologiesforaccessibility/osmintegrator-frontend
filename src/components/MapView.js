import React, {Component} from 'react';
import {MapContainer, TileLayer, Marker, Popup, Polyline, LayersControl, AttributionControl} from 'react-leaflet';
import {Icon} from "leaflet";
import "./mapView.scss"

import 'leaflet/dist/leaflet.css';
//import data from '../assets/BusStopsData';
//import Markers from './BusStopMarkers';

//import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import icon2 from '../assets/bus_stop_icon_black.png';



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
            ztmStops: []
        };
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