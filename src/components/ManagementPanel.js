import React, {useEffect, useState} from 'react';
import client from "../api/apiInstance";
import {getDefaultHeadersWithToken} from "../config/apiConfig";

import {MapContainer, Rectangle, TileLayer, Tooltip} from "react-leaflet";


import './managementPanel.scss';
import colors from "./colors.module.scss";


function ManagementPanel() {

    const [editors, setEditors] = useState([]);
    const [selectedEditor, setSelectedEditor] = useState(["Choose User"]);
    const [tiles, setTiles] = useState([]);
    const [selectedTile, setSelectedTile] = useState(["Choose tile to assign"]);

    const currentLocation = {lat: 50.29, lng: 19.01}
    const zoom = 9


    useEffect(() => {
        getTiles().then(tiles => {
            setTiles(tiles)
        });
    }, []);



    const users = (editors.length > 0)
        ? (editors.map((editor) => <button key={`users-${editor.userName}`} className="dropdown-item"
            // style={(editor.userName === selectedEditor) && {backgroundColor: "gray"} }
                                           onClick={() => (setSelectedEditor(editor.userName))}
        >{editor.userName}</button>))
        : null


    async function getTiles() {
        const response = await client.api.tileGetTilesList(
            {headers: getDefaultHeadersWithToken(localStorage.token)})
        if (response.status === 200) {
            return response.data
        } else {
            console.log("Tile List problem")
        }
    }

    const tilesList = (tiles.length > 0)
        ? (tiles.map((tile) => <button key={`tile-dropdown-${tile.id}`} className="dropdown-item"
                                       onClick={async() => {
                                           const response = await client.api.tileGetUsersDetail(tile.id);
                                           if (response.data.length > 1) {
                                               setEditors(response.data)
                                           } else {
                                               setSelectedEditor("Unassigned");
                                               setEditors([]);
                                           }
                                           setSelectedTile(`X: ${tile.x}, Y: ${tile.y}`);
                                       }}
        >{tile.id}; gtfsStopsCount: {tile.gtfsStopsCount}; osmStopsCount:{tile.osmStopsCount}</button>))
        : null

    const mapTiles = tiles.map((tile) => (
        <Rectangle key={`map-${tile.id}`}
                   bounds={[[tile.maxLat, tile.maxLon], [tile.minLat, tile.minLon]]}
                   pathOptions={{color: colors['colorTileAll']}} eventHandlers={{
            click: () => {
                setSelectedTile(tile.id.slice(0, 13))
                // this.setState({activeTile: tile},
                //     () => {this.getTileStops(tile.id)})
            },
        }}>
            <Tooltip direction="top">x ={tile.x}, y={tile.y}</Tooltip>
        </Rectangle>))

    return (
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>Management panel</h3>
            </div>


            <div className="row">
                <div className="col-md-5">


                    <div>

                        <div
                            className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                            <h4>Assign user to tile</h4>
                        </div>


                        <div className="dropdown d-inline-block ">
                            <button className="btn btn-lg btn-secondary dropdown-toggle customInlineButton"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {selectedTile}
                            </button>
                            <div className="dropdown-menu scrollable-dropdown" aria-labelledby="dropdownMenuButton">
                                {tilesList}
                            </div>

                        </div>

                        <div className="dropdown d-inline-block ">
                            <button className="btn btn-lg btn-secondary dropdown-toggle customInlineButton"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {selectedEditor}
                            </button>
                            <div className="dropdown-menu scrollable-dropdown" aria-labelledby="dropdownMenuButton">
                                {users}
                            </div>

                        </div>


                        <button type="button" className="btn btn-lg btn-secondary customInlineButton">Assign</button>
                    </div>


                    <div>
                        <div
                            className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                            <h4>Assign role to user</h4>
                        </div>
                        <div className="dropdown d-inline-block ">
                            <button className="btn btn-lg btn-secondary dropdown-toggle customInlineButton"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {selectedEditor}
                            </button>
                            <div className="dropdown-menu scrollable-dropdown" aria-labelledby="dropdownMenuButton">
                                {users}
                            </div>

                        </div>

                        <div className="dropdown d-inline-block ">
                            <button className="btn btn-lg btn-secondary dropdown-toggle customInlineButton"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Role
                            </button>
                            <div className="dropdown-menu scrollable-dropdown" aria-labelledby="dropdownMenuButton">
                                {tilesList}
                            </div>

                        </div>


                        <div className="dropdown d-inline-block ">
                            <button className="btn btn-lg btn-secondary dropdown-toggle customInlineButton"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Action
                            </button>
                            <div className="dropdown-menu scrollable-dropdown" aria-labelledby="dropdownMenuButton">
                                <button className="dropdown-item"
                                        onClick={(e) => (e)}>Promote</button>
                                <button className="dropdown-item"
                                        onClick={(e) => (e)}>Demote</button>
                            </div>

                        </div>
                        <button type="button" className="btn btn-lg btn-secondary customInlineButton">Assign</button>
                    </div>

                </div>


                <div className="col-md-7">
                    <div className="map-container">

                        <MapContainer center={currentLocation} zoom={zoom} maxZoom={19} style={{height: "700px"}}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                maxZoom={19}
                            />
                            {mapTiles}
                        </MapContainer>
                    </div>
                </div>
            </div>


        </div>

    );
}

export default ManagementPanel;