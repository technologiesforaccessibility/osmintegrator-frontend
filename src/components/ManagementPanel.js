import React, {useEffect, useState} from 'react';
import client from '../api/apiInstance';
import {getDefaultHeadersWithToken} from '../config/apiConfig';
import CheckIcon from './customs/CheckIcon';
import H3Title from "./customs/H3Title";
import H4Title from "./customs/H4Title";
import NameBox from "./customs/NameBox";
import RoleCheckbox from "./customs/RoleCheckbox";
import CheckboxRow from "./customs/CheckboxRow";

import {MapContainer, Rectangle, TileLayer, Tooltip} from 'react-leaflet';

import './managementPanel.scss';
import colors from './colors.module.scss';

function ManagementPanel() {
    const [editors, setEditors] = useState([]);
    const [selectedEditor, setSelectedEditor] = useState(['Choose User']);
    const [selectedEditorData, setSelectedEditorData] = useState({});
    const [tiles, setTiles] = useState([]);
    const [selectedTile, setSelectedTile] = useState(['Choose tile to assign']);
    const [selectedTileData, setSelectedTileData] = useState(null);
    const [userRolesInitial, setUserRolesInitial] = useState([]);
    const [userRolesModified, setUserRolesModified] = useState([]);
    const [roleList, setRoleList] = useState([]);


    const currentLocation = {lat: 50.29, lng: 19.01};
    const zoom = 9;

    useEffect(() => {
        getTiles().then(tiles => {
            setTiles(tiles);
        });
    }, []);

    useEffect(() => {
        getUserRoles().then(roles => {
            // console.log(roles);
            setUserRolesInitial(roles);
            setRoleList(Object.keys(roles[0].roles));
            setUserRolesModified(roles);
        });
    }, []);

    const getTileUserAssignmentInfo = async id => {
        return await client.api.tileGetUsersDetail(id, {
            headers: getDefaultHeadersWithToken(localStorage.token),
        });
    };

    const users =
        editors.length > 0
            ? editors.map(({id, userName, isAssigned}) => {
                const name = isAssigned ? (
                    <CheckIcon displayedText={userName}/>
                ) : (
                    userName
                );
                return (
                    <button
                        key={`users-${userName}`}
                        className="dropdown-item"
                        onClick={() => {
                            setSelectedEditor(userName);
                            setSelectedEditorData({id, userName});
                        }}>
                        {name}
                    </button>
                );
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

    async function getUserRoles() {
        try {
            const response = await client.api.rolesList({
                headers: getDefaultHeadersWithToken(localStorage.token),
            });
            return response.data;
        } catch {
            console.log('User Role List problem');
        }
    }

    const tilesList =
        tiles.length > 0
            ? tiles.map(({id, x, y, gtfsStopsCount, osmStopsCount}) => (
                <button
                    key={`tile-dropdown-${id}`}
                    className="dropdown-item"
                    onClick={async () => {
                        const response = await getTileUserAssignmentInfo(id);
                        if (response.status !== 200) {
                            setSelectedEditor('Unassigned');
                            setEditors([]);
                            return console.log('Api problem');
                        }
                        await setEditors(response.data.users);
                        setSelectedTile(`X: ${x}, Y: ${y}`);
                        setSelectedTileData({id, x, y});
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
            pathOptions={{
                color: selectedTileData === null
                    ? colors.colorTileAll
                    : (selectedTileData.id === id
                        ? colors.colorTileActiveExplicit
                        : colors.colorTileAll)
            }}
            eventHandlers={{
                click: async () => {
                    const response = await getTileUserAssignmentInfo(id);
                    if (response.status !== 200) {
                        setSelectedEditor('Unassigned');
                        setEditors([]);
                        return console.log('Api problem');
                    }
                    await setEditors(response.data.users);
                    setSelectedTile(`X: ${x}, Y: ${y}`);
                    setSelectedTileData({id, x, y});
                },
            }}>
            <Tooltip direction="top">
                x ={x}, y={y}
            </Tooltip>
        </Rectangle>
    ));

    const assignToTile = async ({id, userName, isAssigned}, tile) => {
        // console.log(tile.id);
        const response = await client.api.tileUpdateUsersCreate(
            {
                id: tile.id,
                users: [
                    {
                        id: id,
                        userName: userName,
                        isAssigned: !isAssigned,
                    },
                ],
            },
            {
                headers: getDefaultHeadersWithToken(localStorage.token),
            },
        );
        // console.log(response.status);
        if (response.status === 200) {
            const resp = await getTileUserAssignmentInfo(tile.id);
            await setEditors(resp.data.users);
        }
    };

    const roleHeaders = roleList.map(role => <div className="d-inline-block management-panel__role-header">
        <div>
            {role}
        </div>
    </div>)

    const rolePanel = userRolesModified !== []
        ? userRolesModified.map( ({id, userName, roles}) => {
        // return (<CheckboxRow roles={roleList} statuses={roles} id={id} />)
           return (<React.Fragment>
               <NameBox name={userName}/> <CheckboxRow roles={roleList} statuses={roles} id={id} />
           </React.Fragment>)
    })
        : null;


    return (
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <H3Title title="Management panel" borderBottom={true}/>

            <div className="row">
                <div className="col-md-5">
                    <div className="management-panel">
                        <H4Title title="Assign user to tile"/>
                        <div className="dropdown d-inline-block management-panel__button management-panel__button--40p">
                            <button
                                className="btn btn-secondary dropdown-toggle management-panel__button--use-all-width"
                                type="button"
                                id="dropdownTileButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                {selectedTile}
                            </button>
                            <div
                                className="dropdown-menu management-panel__scrollable-dropdown"
                                aria-labelledby="dropdownTileButton">
                                {tilesList}
                            </div>
                        </div>

                        <div className="dropdown d-inline-block management-panel__button management-panel__button--30p">
                            <button
                                className="btn btn-secondary dropdown-toggle management-panel__button--use-all-width"
                                type="button"
                                id="dropdownTileUserButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                {selectedEditor}
                            </button>
                            <div
                                className="dropdown-menu management-panel__scrollable-dropdown"
                                aria-labelledby="dropdownTileUserButton">
                                {users}
                            </div>
                        </div>

                        <div className="d-inline-block management-panel__button management-panel__button--15p">
                            <button
                                type="button"
                                className="btn btn-secondary management-panel__button--use-all-width"
                                onClick={() =>
                                    selectedEditorData !== {} &&
                                    selectedTileData !== null &&
                                    assignToTile(
                                        selectedEditorData,
                                        selectedTileData,
                                    )
                                }>
                                {'isAssigned' in selectedEditorData
                                    ? selectedEditorData.isAssigned === true
                                        ? 'Revoke'
                                        : 'Assign'
                                    : 'Assign'}
                            </button>
                        </div>

                    </div>


                    <div className="management-panel">
                        <H4Title title="Assign role to user"/>

                        <div className="management-panel__scrollable-area">
                            <div>

                                <div className="d-inline-block management-panel__name-header">
                                    Name
                                </div>
                                {roleHeaders}

                            </div>


                            <div className="form-group">
                                {rolePanel}
                                {/*<NameBox name="Hello"/>*/}
                                {/*<RoleCheckbox role="rola" id="superId"/>*/}
                                {/*<RoleCheckbox role="rola" id="superId2"/>*/}
                                {/*<RoleCheckbox role="rola" id="superId3"/>*/}
                                {/*<RoleCheckbox role="rola" id="superId4"/>*/}
                                {/*<RoleCheckbox role="rola" id="superId5"/>*/}

                            </div>


                        </div>

                        <button
                            type="button"
                            className="btn btn-secondary management-panel__button--use-all-width"
                            onClick={() => {
                            }
                            }>
                            Save changes
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
