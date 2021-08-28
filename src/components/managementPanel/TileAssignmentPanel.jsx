import { useState } from 'react';

import { basicHeaders } from '../../config/apiConfig';
import api from '../../api/apiInstance';
import H4Title from '../customs/H4Title';
import CustomInlineButton from '../customs/CustomInlineButton';
import CustomDropdownToggle from '../customs/CustomDropdownToggle';
import CustomDropdownMenu from '../customs/CustomDropdownMenu';
import CheckIcon from '../customs/CheckIcon';

const ASSIGN = 'Assign';
const REVOKE = 'Revoke';

function TileAssignmentPanel({
  userButtonTile,
  setUserButtonTile,
  tiles,
  tileUsers,
  setTileUsers,
  tileButtonTile,
  setTileButtonTile,
  selectedTileData,
  setSelectedTileData,
  getTileUserAssignmentInfo }) {

  const [selectedEditorData, setSelectedEditorData] = useState({});

  const tilesList =
    tiles.length > 0
      ? tiles.map(({ id, x, y, gtfsStopsCount, osmStopsCount }) => (
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
            setSelectedTileData({ id, x, y });
            setUserButtonTile(['Choose User']);
            setSelectedEditorData({});
          }}>
          `{id}; gtfsStopsCount: {gtfsStopsCount}; osmStopsCount: {osmStopsCount}`
        </button>
      ))
      : null;

  const assignToTile = async ({ id, userName, isAssigned }, tile) => {
    const response =
      isAssigned === true
        ? await api.tileRemoveUserDelete(tile.id, {
          headers: basicHeaders(),
        })
        : await api.tileUpdateUserUpdate(
          tile.id,
          { id: id },
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

  const usersForTileAssignment =
    tileUsers.length > 0
      ? tileUsers.map(({ id, userName, isAssigned }) => {
        const name = isAssigned ? <CheckIcon displayedText={userName} /> : userName;
        return (
          <button
            key={`users-${userName}`}
            className="dropdown-item"
            onClick={() => {
              setUserButtonTile(userName);
              setSelectedEditorData({ id, userName, isAssigned });
            }}>
            {name}
          </button>
        );
      })
      : null;

  return (
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
              ? REVOKE
              : ASSIGN
            : ASSIGN
        }
      />
    </div>);
}

export default TileAssignmentPanel;