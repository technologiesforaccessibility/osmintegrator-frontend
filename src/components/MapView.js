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
import axios from "axios";
import {getDefaultHeadersWithToken} from '../config/apiConfig';
import {getBusStopIcon} from "./utilities";

const {REACT_APP_BACKEND_ALL_TILES_GET} = process.env;
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
            activeBusStopId : null,
        };
    }

    componentDidMount() {
        const url = REACT_APP_BACKEND_ALL_TILES_GET;
        axios.get(url, {
            headers: getDefaultHeadersWithToken(localStorage.token)
        })
            .then(resp => {
                if (resp.status === 200) {
                    this.setState({tiles: resp.data});
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    console.log("Authentication problem")
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
                    this.setState({allStops: resp.data.stops});
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    console.log(error.response.data.message);
                } else {
                    console.warn("Undefined bus stops problem");
                }
            });


    }

    isActiveStopClicked = (clickedStopId) => {
        const activeStopId = this.state.activeBusStopId;
        return ((activeStopId === clickedStopId))
    }


    clickBusStop = (gridProperties) => {
        this.setState({activeBusStopId : gridProperties.id});
        this.props.setPropertyGrid(gridProperties);
    }

    unclickBusStop = () => {
        this.setState({activeBusStopId : null});
        this.props.setPropertyGrid(null);
    }



    render() {

        const {currentLocation, zoom} = this.state;
        const tileColor = 'black';

        return (

            <div className="map-container">

                <MapContainer center={currentLocation} zoom={zoom}>
                    onClick={this.addMarker}
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    {this.state.visiblePolylines.map((position) =>
                        <Polyline pathOptions={purpleOptions} positions={position}/>
                    )}
                    {this.state.tiles.map((tile) => (
                        <Rectangle bounds={[[tile.maxLat, tile.maxLon], [tile.minLat, tile.minLon]]}
                                   pathOptions={{color: tileColor}} eventHandlers={{
                            click: () => {
                                this.getTileStops(tile.id);
                            },
                        }}>
                            <Tooltip direction="top">x ={tile.x}, y={tile.y}</Tooltip>
                        </Rectangle>
                    ))}

                    {this.state.allStops.map((busStop) =>
                        <Marker key={busStop.id} position={[busStop.lat, busStop.lon]} icon={getBusStopIcon(busStop)}
                                eventHandlers={{
                                    click: (e) => {
                                        if (this.props.canConnectBusStops === true) {
                                            this.connectPointer(e);
                                        } else {
                                            (this.isActiveStopClicked(busStop.id)? this.unclickBusStop() : this.clickBusStop(busStop));
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