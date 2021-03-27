import React, {useEffect, useState} from 'react';
import client from '../api/apiInstance';
import {getDefaultHeadersWithToken} from '../config/apiConfig';
import CheckIcon from "./customs/CheckIcon";

import {MapContainer, Rectangle, TileLayer, Tooltip} from 'react-leaflet';

import './managementPanel.scss';
import colors from './colors.module.scss';

function ManagementPanel() {
    const [editors, setEditors] = useState([]);
    const [selectedEditor, setSelectedEditor] = useState(['Choose User']);
    const [selectedEditorData, setSelectedEditorData] = useState({});
    const [tiles, setTiles] = useState([]);
    const [selectedTile, setSelectedTile] = useState(['Choose tile to assign']);

    const currentLocation = {lat: 50.29, lng: 19.01};
    const zoom = 9;

    useEffect(() => {
        getTiles().then(tiles => {
            setTiles(tiles);
        });
    }, []);

    // Todo: effect -> refresh user dropdown when assign user to tile

    const users =
        editors.length > 0
            ? editors.map(({id, userName, isAssigned}) => {
                const name = isAssigned ? <CheckIcon displayedText={userName}/> : userName;
                return (
                    <button
                        key={`users-${userName}`}
                        className="dropdown-item"
                        onClick={() => {
                            setSelectedEditor(userName);
                            setSelectedEditorData({id, userName})
                        }}>
                        {name}
                    </button>)
            })
            : null;

    async function getTiles() {
        try {
            const response = await client.api.tileGetTilesList({
                headers: getDefaultHeadersWithToken(localStorage.token),
            });
            return response.data;
        } catch {
            console.log('Tile List problem');
        }
    }

    const tilesList =
        tiles.length > 0
            ? tiles.map(({id, x, y, gtfsStopsCount, osmStopsCount}) => (
                <button
                    key={`tile-dropdown-${id}`}
                    className="dropdown-item"
                    onClick={async () => {
                        const response = await client.api.tileGetUsersDetail(
                            id,
                            {
                                headers: getDefaultHeadersWithToken(
                                    localStorage.token,
                                ),
                            },
                        );
                        if (response.status !== 200) {
                            setSelectedEditor('Unassigned');
                            setEditors([]);
                            return console.log('Api problem');
                        }
                        await setEditors(response.data.users);
                        setSelectedTile(`X: ${x}, Y: ${y}`);
                    }}>
                    `{id}; gtfsStopsCount: {gtfsStopsCount}; osmStopsCount:{' '}
                    {osmStopsCount}`
                </button>
            ))
            : null;

    const mapTiles = tiles.map(({id, maxLat, maxLon, minLat, minLon, x, y}) => (
        <Rectangle
            key={`map-${id}`}
            bounds={[
                [maxLat, maxLon],
                [minLat, minLon],
            ]}
            pathOptions={{color: colors.colorTileAll}}
            eventHandlers={{
                click: () => {
                    setSelectedTile(id.slice(0, 13));
                    // this.setState({activeTile: tile},
                    //     () => {this.getTileStops(id)})
                },
            }}>
            <Tooltip direction="top">
                x ={x}, y={y}
            </Tooltip>
        </Rectangle>
    ));

    const assignToTile = async () => ({id, userName}, {tile}, bool) => {
        client.api.tileUpdateUsersCreate({
            "id": tile.id,
            "users": [
                {
                    "id": id,
                    "userName": userName,
                    "isAssigned": bool
                }
            ]
        }, {
            headers: getDefaultHeadersWithToken(
                localStorage.token,
            ),
        })
    }

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
                            <button
                                className="btn btn-lg btn-secondary dropdown-toggle customInlineButton"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                {selectedTile}
                            </button>
                            <div
                                className="dropdown-menu scrollable-dropdown"
                                aria-labelledby="dropdownMenuButton">
                                {tilesList}
                            </div>
                        </div>

                        <div className="dropdown d-inline-block ">
                            <button
                                className="btn btn-lg btn-secondary dropdown-toggle customInlineButton"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                {selectedEditor}
                            </button>
                            <div
                                className="dropdown-menu scrollable-dropdown"
                                aria-labelledby="dropdownMenuButton">
                                {users}
                            </div>
                        </div>

                        <button
                            type="button"
                            className="btn btn-lg btn-secondary customInlineButton"
                            onClick={assignToTile(selectedEditorData, selectedTile, true)}>
                            Assign
                        </button>
                    </div>

                    <div>
                        <div
                            className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                            <h4>Assign role to user</h4>
                        </div>
                        <div className="dropdown d-inline-block ">
                            <button
                                className="btn btn-lg btn-secondary dropdown-toggle customInlineButton"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                {selectedEditor}
                            </button>
                            <div
                                className="dropdown-menu scrollable-dropdown"
                                aria-labelledby="dropdownMenuButton">
                                {users}
                            </div>
                        </div>

                        <div className="dropdown d-inline-block ">
                            <button
                                className="btn btn-lg btn-secondary dropdown-toggle customInlineButton"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                Role
                            </button>
                            <div
                                className="dropdown-menu scrollable-dropdown"
                                aria-labelledby="dropdownMenuButton">
                                {tilesList}
                            </div>
                        </div>

                        <div className="dropdown d-inline-block ">
                            <button
                                className="btn btn-lg btn-secondary dropdown-toggle customInlineButton"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                Action
                            </button>
                            <div
                                className="dropdown-menu scrollable-dropdown"
                                aria-labelledby="dropdownMenuButton">
                                <button
                                    className="dropdown-item"
                                    onClick={e => e}>
                                    Promote
                                </button>
                                <button
                                    className="dropdown-item"
                                    onClick={e => e}>
                                    Demote
                                </button>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="btn btn-lg btn-secondary customInlineButton">
                            Assign
                        </button>
                    </div>
                </div>

                <div className="col-md-7">
                    <div className="map-container">
                        <MapContainer
                            center={currentLocation}
                            zoom={zoom}
                            maxZoom={19}
                            style={{height: '700px'}}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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
