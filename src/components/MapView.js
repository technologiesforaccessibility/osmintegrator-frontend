import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";

import 'leaflet/dist/leaflet.css';
//import data from '../assets/BusStopsData';
//import Markers from './BusStopMarkers';

//import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import icon2 from '../assets/bus_stop_icon_black.png';


let busStopPointerBlackIcon2 = new Icon({
    iconUrl: icon2,
    shadowUrl: iconShadow,
    iconSize: [70, 65],
    iconAnchor: [1, 55],
    shadowSize: [68, 60],
    shadowAnchor: [-10, 55]
  });

class MapView extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: { lat: 51.505, lng: -0.09 },
            zoom: 12,
            markers: [[51.505, -0.09], [52.501, -0.0889]]
        };
    }

    addMarker = (e) => {
    const {markers} = this.state
    markers.push(e.latlng)
    this.setState({markers})
    }

    render() {
    const { currentLocation, zoom } = this.state;
    return (
        <MapContainer center={currentLocation} zoom={zoom}>
        onClick={this.addMarker}
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />        
        {this.state.markers.map((position, idx) => 
            <Marker key={`marker-${idx}`} position={position} icon={busStopPointerBlackIcon2}>
            <Popup>
            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
            </Popup>
        </Marker>
        )}
        </MapContainer>
    );
    }
}

export default MapView;