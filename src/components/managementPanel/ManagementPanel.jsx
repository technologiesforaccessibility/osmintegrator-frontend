import {useEffect, useState} from 'react';
import {Rectangle, Tooltip} from 'react-leaflet';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {CircularProgress, TextField} from '@mui/material';

import api from '../../api/apiInstance';
import {basicHeaders} from '../../config/apiConfig';
import H3Title from '../customs/H3Title';
import colors from '../../stylesheets/config/colors.module.scss';
import ManagementPanelMap from './ManagementPanelMap';
import Dashboard from '../Dashboard';
import RoleAssignmentPanel from './RoleAssignmentPanel';
import H4Title from '../customs/H4Title';
import {NotificationActions} from '../../redux/actions/notificationActions';
import {exception} from '../../utilities/exceptionHelper';

import '../../stylesheets/managementPanel.scss';

const NONE = 'none';
const CURRENT_LOCATION = {lat: 50.29, lng: 19.01};
const ZOOM = 9;

function ManagementPanel() {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [tiles, setTiles] = useState([]);
  const [tileUsers, setTileUsers] = useState([]);

  const [tilesLoaded, setTilesLoaded] = useState(false);
  const [userSelected, setUserSelected] = useState(false);
  const [selectedTileId, setSelectedTileId] = useState('');
  const [usersLoaded, setUsersLoaded] = useState(true);

  const initState = () => {
    setTilesLoaded(false);
    setUserSelected(false);
    setUsersLoaded(true);
  };

  const tilesLoadedState = () => {
    setTilesLoaded(true);
    setUserSelected(false);
    setUsersLoaded(true);
  };

  const loadingUsersState = () => {
    setTilesLoaded(true);
    setUserSelected(false);
    setUsersLoaded(false);
  };

  const userSelectedState = () => {
    setTilesLoaded(true);
    setUserSelected(true);
    setUsersLoaded(true);
  };

  useEffect(() => {
    initState();
    getTiles().then(tiles => {
      setTiles(tiles);
      tilesLoadedState();
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getTileUserAssignmentInfo = async id => {
    return await api.tileGetUsersDetail(id, {
      headers: basicHeaders(),
    });
  };

  async function getTiles() {
    try {
      const response = await api.tileGetAllTilesList({
        headers: basicHeaders(),
      });
      return response.data;
    } catch (error) {
      exception(error);
    }
  }

  function getColor(id, usersCount, approvedByEditor, approvedBySupervisor) {
    if (selectedTileId !== null && selectedTileId === id) {
      return colors.colorTileActiveExplicit;
    }
    if (approvedBySupervisor) {
      return colors.colorApprovedBySupervisor;
    }
    if (approvedByEditor) {
      return colors.colorApprovedByEditor;
    }
    if (usersCount === 1) return colors.colorTileAssigned;
    return colors.colorTileAll;
  }

  const mapTiles = tiles.map(
    ({id, maxLat, maxLon, minLat, minLon, x, y, usersCount, approvedByEditor, approvedBySupervisor}) => (
      <Rectangle
        key={`map-${id}`}
        bounds={[
          [maxLat - 0.001, maxLon - 0.0015],
          [minLat + 0.001, minLon + 0.0015],
        ]}
        pathOptions={{
          color: getColor(id, usersCount, approvedByEditor, approvedBySupervisor),
        }}
        eventHandlers={{
          click: async () => {
            handleTileSelected(id);
          },
        }}>
        <Tooltip direction="top">
          Y: {x}, Y: {y} <br />
          {t('managementPanel.assigned')}: {usersCount === 1 ? t('yes') : t('no')} <br />
        </Tooltip>
      </Rectangle>
    ),
  );

  const handleTileSelected = async tileId => {
    loadingUsersState();

    setSelectedTileId(tileId);

    const response = await getTileUserAssignmentInfo(tileId);
    if (response.status !== 200) {
      setTileUsers([]);
      dispatch(NotificationActions.error(t('unrecognizedProblem')));
      tilesLoadedState();
      return;
    }

    setTileUsers(fulfillTileUsers(response.data.users));

    userSelectedState();
  };

  const fulfillTileUsers = users => {
    const result = [...users];
    const assignedUser = result.find(x => x.isAssigned);

    const noneUser = {
      id: NONE,
      userName: NONE,
      isAssigned: assignedUser === undefined,
    };

    result.unshift(noneUser);
    return result;
  };

  const tilesDropDown =
    tiles.length > 0
      ? tiles.map(({id, x, y}) => (
          <MenuItem key={`tile-dropdown-${id}`} value={id}>
            X: {x}, Y: {y}
          </MenuItem>
        ))
      : null;

  const selectedUser = tileUsers.length > 0 ? tileUsers.find(x => x.isAssigned).id : '';

  const dropdownUsers =
    tileUsers.length > 0
      ? tileUsers.map(({id, userName, isAssigned}) => (
          <MenuItem key={id} value={id}>
            {userName === NONE ? t('managementPanel.noUser') : userName}
          </MenuItem>
        ))
      : null;

  const handleSave = async () => {
    try {
      const selectedUser = tileUsers.find(x => x.isAssigned);
      if (selectedUser !== null) {
        initState();

        const response =
          selectedUser.id === NONE
            ? await api.tileRemoveUserDelete(selectedTileId, {
                headers: basicHeaders(),
              })
            : await api.tileUpdateUserUpdate(
                selectedTileId,
                {id: selectedUser.id},
                {
                  headers: basicHeaders(),
                },
              );

        if (response.status === 200) {
          dispatch(NotificationActions.success(response.data.value));

          const resp = await getTileUserAssignmentInfo(selectedTileId);
          const userList = fulfillTileUsers(resp.data.users);

          const tempTiles = [...tiles];
          const tempSelectedTile = tempTiles.find(x => x.id === selectedTileId);

          tempSelectedTile.usersCount = selectedUser.id === NONE ? 0 : 1;
          setTiles(tempTiles);

          setTileUsers(userList);
        } else {
          dispatch(NotificationActions.error(t('unrecognizedProblem')));
        }
        userSelectedState();
      }
    } catch (error) {
      exception(error);
      userSelectedState();
    }
  };

  const handleUserChanged = id => {
    const newTileUsers = [...tileUsers];

    newTileUsers.forEach(x => (x.isAssigned = false));
    newTileUsers.find(x => x.id === id).isAssigned = true;
    setTileUsers(newTileUsers);
  };

  return (
    <Dashboard>
      <div className="management-panel">
        <div className="management-panel__head">
          <H3Title title="Management panel" />
          <div className="tile-assignment">
            <H4Title className="tile-assignment__header" title={t('managementPanel.assignUserToTile')} />
            {((!tilesLoaded || !tilesDropDown) && <CircularProgress className="tile-assignment__tile-dropdown" />) || (
              <TextField
                id={'select-tile-id'}
                variant={'filled'}
                select
                label={t('managementPanel.selectTile')}
                value={selectedTileId}
                onChange={e => handleTileSelected(e.target.value)}
                margin="normal"
                fullWidth>
                {tilesDropDown}
              </TextField>
            )}
            {((!usersLoaded) && <CircularProgress />) || (
              <TextField
                id={'select-user-id'}
                variant={'filled'}
                select
                label={t('managementPanel.chooseUser')}
                value={selectedUser}
                onChange={e => handleUserChanged(e.target.value)}
                margin="normal"
                fullWidth>
                {dropdownUsers || []}
              </TextField>
            )}
            <Button
              className="tile-assignment__button"
              onClick={handleSave}
              color="primary"
              variant="contained"
              disabled={!userSelected}
              fullWidth>
              {t('buttons.save')}
            </Button>
          </div>
          <RoleAssignmentPanel />
        </div>
        <div className="management-panel__map">
          <ManagementPanelMap startPoint={CURRENT_LOCATION} zoom={ZOOM} tiles={mapTiles} />
        </div>
      </div>
    </Dashboard>
  );
}

export default ManagementPanel;
