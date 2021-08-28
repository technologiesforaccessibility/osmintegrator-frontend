import { useEffect, useState } from 'react';
import { Rectangle, Tooltip } from 'react-leaflet';

import api from '../../api/apiInstance';
import { basicHeaders } from '../../config/apiConfig';

import H3Title from '../customs/H3Title';


import '../../stylesheets/managementPanel.scss';
import colors from '../../stylesheets/config/colors.module.scss';
import ManagementPanelMap from './ManagementPanelMap';
import Dashboard from '../Dashboard';
import RoleAssignmentPanel from './RoleAssignmentPanel';
import TileAssignmentPanel from './TileAssignmentPanel';

function ManagementPanel() {
  const [userButtonTile, setUserButtonTile] = useState(['Choose User']);
  const [tileButtonTile, setTileButtonTile] = useState(['Choose tile to assign']);
  const [tiles, setTiles] = useState([]);
  const [tileUsers, setTileUsers] = useState([]);
  const [selectedTileData, setSelectedTileData] = useState(null);

  const currentLocation = { lat: 50.29, lng: 19.01 };
  const zoom = 9;

  useEffect(() => {
    getTiles().then(tiles => {
      setTiles(tiles);
    });
  }, []);

  const getTileUserAssignmentInfo = async id => {
    return await api.tileGetUsersDetail(id, {
      headers: basicHeaders(),
    });
  };

  async function getTiles() {
    try {
      const response = await api.tileGetTilesList({
        headers: basicHeaders(),
      });
      return response.data;
    } catch {
      console.log('Tile List problem');
    }
  }

  const mapTiles = tiles.map(({ id, maxLat, maxLon, minLat, minLon, x, y }) => (
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
          setSelectedTileData({ id, x, y });
        },
      }}>
      <Tooltip direction="top">
        x ={x}, y={y}
      </Tooltip>
    </Rectangle>
  ));

  return (
    <Dashboard>
      <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <H3Title title="Management panel" borderBottom={true} />

        <div className="row">
          <div className="col-md-5">
            <TileAssignmentPanel
              userButtonTile={userButtonTile}
              setUserButtonTile={setUserButtonTile}
              tiles={tiles}
              tileUsers={tileUsers}
              setTileUsers={setTileUsers}
              tileButtonTile={tileButtonTile}
              setTileButtonTile={setTileButtonTile}
              selectedTileData={selectedTileData}
              setSelectedTileData={setSelectedTileData}
              getTileUserAssignmentInfo={getTileUserAssignmentInfo}
            />

            <RoleAssignmentPanel />
          </div>

          <div className="col-md-7">
            <ManagementPanelMap startPoint={currentLocation} zoom={zoom} tiles={mapTiles} />
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default ManagementPanel;
