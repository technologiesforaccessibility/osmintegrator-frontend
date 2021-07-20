import React, {useEffect, useState} from 'react';
import {Rectangle, Tooltip} from 'react-leaflet';

import client from '../api/apiInstance';
import {basicHeaders} from '../config/apiConfig';
import CheckIcon from './customs/CheckIcon';
import H3Title from './customs/H3Title';
import H4Title from './customs/H4Title';
import CustomInlineButton from './customs/CustomInlineButton';
import CustomDropdownToggle from './customs/CustomDropdownToggle';
import CustomDropdownMenu from './customs/CustomDropdownMenu';
import CustomCheckbox from './customs/CustomCheckbox';

import '../stylesheets/managementPanel.scss';
import colors from '../stylesheets/config/colors.module.scss';
import ManagementPanelMap from './ManagementPanelMap';

function ManagementPanel() {
  const [userButtonTile, setUserButtonTile] = useState(['Choose User']);
  const [tileButtonTile, setTileButtonTile] = useState(['Choose tile to assign']);
  const [tiles, setTiles] = useState([]);
  const [tileUsers, setTileUsers] = useState([]);
  const [selectedTileData, setSelectedTileData] = useState(null);
  const [selectedEditorData, setSelectedEditorData] = useState({});

  const [userButtonRole, setUserButtonRole] = useState(['Choose User']);
  const [userRoleList, setUserRoleList] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState({});
  const [selectedUserRoles, setSelectedUserRoles] = useState([]);

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
      headers: basicHeaders(),
    });
  };

  const usersForTileAssignment =
    tileUsers.length > 0
      ? tileUsers.map(({id, userName, isAssigned}) => {
          const name = isAssigned ? <CheckIcon displayedText={userName} /> : userName;
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
        headers: basicHeaders(),
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
            `{id}; gtfsStopsCount: {gtfsStopsCount}; osmStopsCount: {osmStopsCount}`
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
            headers: basicHeaders(),
          })
        : await client.api.tileUpdateUserUpdate(
            tile.id,
            {id: id},
            {
              headers: basicHeaders(),
            },
          );

    if (response.status === 200) {
      const resp = await getTileUserAssignmentInfo(tile.id);
      await setTileUsers(resp.data.users);
      setUserButtonTile(['Choose User']);
    }
  };

  async function getUserList() {
    try {
      const response = await client.api.rolesList({
        headers: basicHeaders(),
      });
      return response.data;
    } catch {
      console.log('User Role List problem');
    }
  }

  const usersForRoleAssignment =
    userRoleList.length > 0
      ? userRoleList.map(({id, userName, roles}) => {
          return (
            <button
              key={userName}
              className="dropdown-item"
              onClick={() => {
                setUserButtonRole(userName);

                // roles in new memory location ?
                const copiedRoles = [...roles];
                setSelectedUserData({id, userName});
                setSelectedUserRoles(copiedRoles);
              }}>
              {userName}
            </button>
          );
        })
      : null;

  const handleCbChange = (value, index) => {
    let userData = [...selectedUserRoles];
    userData[index].value = !value;
    setSelectedUserRoles(userData);
  };

  const roleCheckboxes =
    selectedUserRoles.length > 0 ? (
      selectedUserRoles.map(({name, value}, index) => {
        return <CustomCheckbox key={index} value={value} name={name} handleOnChange={() => handleCbChange(value, index)} />;
      })
    ) : (
      <p>You havent chosen user yet</p>
    );

  const assignRole = async () => {
    let requestBody = [
      {
        ...selectedUserData,
        roles: selectedUserRoles,
      },
    ];

    try {
      await client.api.rolesUpdate(requestBody, {
        headers: basicHeaders(),
      });
      const userList = await getUserList();
      setUserRoleList(userList);
      setUserButtonRole(['Choose User']);
      setSelectedUserData({});
      setSelectedUserRoles([]);
    } catch {
      console.log('Update role problem');
    }
  };

  return (
    <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <H3Title title="Management panel" borderBottom={true} />

      <div className="row">
        <div className="col-md-5">
          <div className="management-panel">
            <H4Title title="Assign user to tile" />
            <div className="dropdown d-inline-block management-panel__button management-panel__button--40p">
              <CustomDropdownToggle>{tileButtonTile}</CustomDropdownToggle>
              <CustomDropdownMenu>{tilesList}</CustomDropdownMenu>
            </div>

            <div className="dropdown d-inline-block management-panel__button management-panel__button--30p">
              <CustomDropdownToggle>{userButtonTile}</CustomDropdownToggle>
              <CustomDropdownMenu>{usersForTileAssignment}</CustomDropdownMenu>
            </div>
            <CustomInlineButton
              handleOnClick={() => {
                selectedEditorData !== {} &&
                  selectedTileData !== null &&
                  assignToTile(selectedEditorData, selectedTileData);
              }}
              buttonTitle={
                'isAssigned' in selectedEditorData
                  ? selectedEditorData.isAssigned === true
                    ? 'Revoke'
                    : 'Assign'
                  : 'Assign'
              }
            />
          </div>

          <div className="management-panel">
            <H4Title title="Assign role to user" />
            <div className="dropdown d-inline-block management-panel__button management-panel__button--30p">
              <CustomDropdownToggle>{userButtonRole}</CustomDropdownToggle>
              <CustomDropdownMenu>{usersForRoleAssignment}</CustomDropdownMenu>
            </div>
            <CustomInlineButton handleOnClick={() => assignRole()} buttonTitle="Save changes" buttonWidth={30} />
            {roleCheckboxes}
          </div>
        </div>

        <div className="col-md-7">
          <ManagementPanelMap startPoint={currentLocation} zoom={zoom} tiles={mapTiles} />
        </div>
      </div>
    </div>
  );
}

export default ManagementPanel;
