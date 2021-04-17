import React, {Fragment, useEffect, useState} from 'react';
import {MapContainer, Rectangle, TileLayer, Tooltip} from 'react-leaflet';

import client from '../api/apiInstance';
import {getDefaultHeadersWithToken} from '../config/apiConfig';
import CheckIcon from './customs/CheckIcon';
import H3Title from './customs/H3Title';
import H4Title from './customs/H4Title';

import './managementPanel.scss';
import colors from './colors.module.scss';

function ManagementPanel() {
    const [userButtonTile, setUserButtonTile] = useState(['Choose User']);
    const [tileButtonTile, setTileButtonTile] = useState([
        'Choose tile to assign',
    ]);
    const [tiles, setTiles] = useState([]);
    const [tileUsers, setTileUsers] = useState([]);
    const [selectedTileData, setSelectedTileData] = useState(null);
    const [selectedEditorData, setSelectedEditorData] = useState({});

    const [userButtonRole, setUserButtonRole] = useState(['Choose User']);
    const [userRoleList, setUserRoleList] = useState([]);
    const [selectedUserData, setSelectedUserData] = useState({});

    const currentLocation = {lat: 50.29, lng: 19.01};
    const zoom = 9;

    useEffect(() => {
        getTiles().then(tiles => {
            setTiles(tiles);
        });
    }, []);

    useEffect(() => {
        getUserList().then(userList => {
            setUserRoleList(userList);
        });
    }, []);

    const getTileUserAssignmentInfo = async id => {
        return await client.api.tileGetUsersDetail(id, {
            headers: getDefaultHeadersWithToken(localStorage.token),
        });
    };

    const usersForTileAssignment =
        tileUsers.length > 0
            ? tileUsers.map(({id, userName, isAssigned}) => {
                  const name = isAssigned ? (
                      <CheckIcon displayedText={userName} />
                  ) : (
                      userName
                  );
                  return (
                      <button
                          key={`users-${userName}`}
                          className="dropdown-item"
                          onClick={() => {
                              setUserButtonTile(userName);
                              setSelectedEditorData({id, userName, isAssigned});
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

    async function getUserList() {
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
                              setUserButtonTile('Unassigned');
                              setTileUsers([]);
                              return console.log('Api problem');
                          }
                          await setTileUsers(response.data.users);
                          setTileButtonTile(`X: ${x}, Y: ${y}`);
                          setSelectedTileData({id, x, y});
                          setUserButtonTile(['Choose User']);
                          setSelectedEditorData({});
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
                color:
                    selectedTileData === null
                        ? colors.colorTileAll
                        : selectedTileData.id === id
                        ? colors.colorTileActiveExplicit
                        : colors.colorTileAll,
            }}
            eventHandlers={{
                click: async () => {
                    const response = await getTileUserAssignmentInfo(id);
                    if (response.status !== 200) {
                        setUserButtonTile('Unassigned');
                        setTileUsers([]);
                        return console.log('Api problem');
                    }
                    await setTileUsers(response.data.users);
                    setTileButtonTile(`X: ${x}, Y: ${y}`);
                    setSelectedTileData({id, x, y});
                },
            }}>
            <Tooltip direction="top">
                x ={x}, y={y}
            </Tooltip>
        </Rectangle>
    ));

    const assignToTile = async ({id, userName, isAssigned}, tile) => {
        const response =
            isAssigned === true
                ? await client.api.tileRemoveUserDelete(tile.id, {
                      headers: getDefaultHeadersWithToken(localStorage.token),
                  })
                : await client.api.tileUpdateUserUpdate(
                      tile.id,
                      {id: id},
                      {
                          headers: getDefaultHeadersWithToken(
                              localStorage.token,
                          ),
                      },
                  );

        if (response.status === 200) {
            const resp = await getTileUserAssignmentInfo(tile.id);
            await setTileUsers(resp.data.users);
            setUserButtonTile(['Choose User']);
        }
    };

    const usersForRoleAssignment =
        userRoleList.length > 0
            ? userRoleList.map(({id, userName, roles}) => {
                  return (
                      <button
                          key={userName}
                          className="dropdown-item"
                          onClick={() => {
                              setUserButtonRole(userName);
                              console.log('OLD user data: ', selectedUserData);
                              console.log('FUTURE userData: ', {id, userName, roles});
                              setSelectedUserData({id, userName, roles});

                          }}>
                          {userName}
                      </button>
                  );
              })
            : null;

    const handleCbChange = (e, index) => {
        console.log('target value: ', e.target.value)
        let userData = selectedUserData
        userData.roles[index].value = !userData.roles[index].value;
        console.log('NewUserData', userData);
        setSelectedEditorData(userData);
    }

    const roleCheckboxes =
        selectedUserData.roles
            ? selectedUserData.roles.map(({name, value}, index) => {
                return (
                    <div key={name} className="management-panel__checkbox-wrapper">
                        <input type="checkbox"
                               value={value}
                               checked={value}
                               onClick={(e) => handleCbChange(e, index)}
                               />
                        <label className="management-panel__checkbox-label">{name}</label>
                    </div>
                )
            })
            : <p>You havent chosen user yet</p>


    return (
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <H3Title title="Management panel" borderBottom={true} />

            <div className="row">
                <div className="col-md-5">
                    <div className="management-panel">
                        <H4Title title="Assign user to tile" />

                        <div className="dropdown d-inline-block management-panel__button management-panel__button--40p">
                            <button
                                className="btn btn-secondary dropdown-toggle management-panel__button--use-all-width"
                                type="button"
                                id="dropdownTileButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                {tileButtonTile}
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
                                {userButtonTile}
                            </button>
                            <div
                                className="dropdown-menu management-panel__scrollable-dropdown"
                                aria-labelledby="dropdownTileUserButton">
                                {usersForTileAssignment}
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
                        <H4Title title="Assign role to user" />

                        <div className="dropdown d-inline-block management-panel__button management-panel__button--30p">
                            <button
                                className="btn btn-secondary dropdown-toggle management-panel__button--use-all-width"
                                type="button"
                                id="dropdownTileUserButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                {userButtonRole}
                            </button>
                            <div
                                className="dropdown-menu management-panel__scrollable-dropdown"
                                aria-labelledby="dropdownTileUserButton">
                                {usersForRoleAssignment}
                            </div>
                        </div>

                        {roleCheckboxes}

                        <button
                            type="button"
                            className="btn btn-secondary management-panel__button--use-all-width"
                            onClick={() => {console.log(selectedUserData)}}>
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
