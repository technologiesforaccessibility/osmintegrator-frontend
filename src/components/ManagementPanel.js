import React, {useEffect, useState} from 'react';
import client from '../api/apiInstance';
import {getDefaultHeadersWithToken} from '../config/apiConfig';
import CheckIcon from './customs/CheckIcon';

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
    const currentLocation = {lat: 50.29, lng: 19.01};
    const zoom = 9;

    useEffect(() => {
        getTiles().then(tiles => {
            setTiles(tiles);
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
                      <CheckIcon displayedText={userName} />
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

    const tilesList =
        tiles.length > 0
            ? tiles.map(({id, x, y, gtfsStopsCount, osmStopsCount}) => (
                  <button
                      key={`tile-dropdown-${id}`}
                      className="dropdown-item"
                      onClick={async () => {
                          const response = await getTileUserAssignmentInfo(id);
                          console.log(response);
                          if (response.status !== 200) {
                              setSelectedEditor('Unassigned');
                              setEditors([]);
                              return console.log('Api problem');
                          }
                          await setEditors(response.data.users);
                          setSelectedTile(`X: ${x}, Y: ${y}`);
                          console.log();
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

    const assignToTile = async ({id, userName, isAssigned}, tile) => {
        console.log(tile.id);
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
        console.log(response.status);
        if (response.status === 200) {
            const resp = await getTileUserAssignmentInfo(tile.id);
            await setEditors(resp.data.users);
        }
    };

    return (
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>Management panel</h3>
            </div>

            <div className="row">
                <div className="col-md-5">
                    <div>
                        <div className="management-panel">
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                                <h4>Assign user to tile</h4>
                            </div>
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
                    </div>

                    <div className="management-panel">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                            <h4>Assign role to user</h4>
                        </div>
                        
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
