import React, {Component} from 'react';
import {MapContainer, TileLayer, Marker, Popup, Polyline} from 'react-leaflet';
import {Icon} from "leaflet";
import "./mapView.scss"

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
    iconAnchor: [35, 55],
    shadowSize: [68, 60],
    shadowAnchor: [-10, 55]
});

const polyline = [
  [50.27011, 19.03011],
  [50.23011, 18.98011]
]

const purpleOptions = { color: 'purple' }

class MapView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentLocation: {lat: 50.25, lng: 19.01},
            zoom: 12,
            markers: [[50.27011, 19.03011], [50.23011, 18.98011]]
        };
    }

    addMarker = (e) => {
        const {markers} = this.state
        markers.push(e.latlng)
        this.setState({markers})
    }

    render() {
        const {currentLocation, zoom} = this.state;
        return (
            <div className="map-container">
                <MapContainer center={currentLocation} zoom={zoom}>
                    onClick={this.addMarker}
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <Polyline pathOptions={purpleOptions} positions={polyline} />
                    {this.state.markers.map((position, idx) =>
                        <Marker key={`marker-${idx}`} position={position} icon={busStopPointerBlackIcon2}>
                            <Popup>
                                <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
                            </Popup>
                        </Marker>
                    )}

                </MapContainer>
            </div>

        );
    }
}

export default MapView;