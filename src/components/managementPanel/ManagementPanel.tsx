import {useCallback, useEffect, useMemo, useState} from 'react';
import {Rectangle, Tooltip} from 'react-leaflet';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {CircularProgress, TextField} from '@mui/material';

import api from '../../api/apiInstance';
import {Tile, TileUser} from '../../api/apiClient';
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

  const [tiles, setTiles] = useState<Tile[]>([]);
  const [tileUsers, setTileUsers] = useState<TileUser[]>([]);

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
    const getInitialState = async () => {
      initState();
      try {
        const t = await getTiles();

        setTiles(t || []);
      } catch (e) {
        exception(e);
      } finally {
        setTilesLoaded(true);
      }
    };

    getInitialState();
  }, []);

  const getTileUserAssignmentInfo = async (id: string) => {
    return await api.tileGetUsersDetail(id, {
      headers: basicHeaders(),
    });
  };

  const getTiles = async () => {
    try {
      const response = await api.tileGetAllTilesList({
        headers: basicHeaders(),
      });
      return response.data;
    } catch (error) {
      exception(error);
    }
  };

  const getColor = useCallback(
    (id: string, usersCount: number, approvedByEditor: boolean, approvedBySupervisor: boolean) => {
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
    },
    [selectedTileId],
  );

  const handleTileSelected = useCallback(
    async (tileId: string) => {
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
    },
    [dispatch, t],
  );

  const mapTiles = useMemo(
    () =>
      tiles.map(({id, maxLat, maxLon, minLat, minLon, x, y, usersCount, approvedByEditor, approvedBySupervisor}) => (
        <Rectangle
          key={`map-${id}`}
          bounds={[
            [maxLat - 0.001, maxLon - 0.0015],
            [minLat + 0.001, minLon + 0.0015],
          ]}
          pathOptions={{
            color: getColor(id, usersCount || 0, approvedByEditor, approvedBySupervisor),
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
      )),
    [tiles, getColor, handleTileSelected, t],
  );

  const fulfillTileUsers = (users: TileUser[]) => {
    const result = [...users];

    const noneUser: TileUser = {
      id: NONE,
      userName: NONE,
      isAssigned: !result.some(x => x.isAssigned),
      isAssignedAsSupervisor: !result.some(x => x.isAssignedAsSupervisor),
      isSupervisor: true,
      isEditor: true,
    };

    result.unshift(noneUser);
    return result;
  };

  const tilesDropDown = useMemo(
    () =>
      tiles.map(({id, x, y}) => (
        <MenuItem key={`tile-dropdown-${id}`} value={id}>
          X: {x}, Y: {y}
        </MenuItem>
      )),
    [tiles],
  );

  const selectedUser = (tileUsers.find(x => x.isAssigned) || {id: NONE}).id;
  const selectedSupervisor = (tileUsers.find(x => x.isAssignedAsSupervisor) || {id: NONE}).id;

  const dropdownUsers = useMemo(
    () =>
      tileUsers
        .filter(u => u.isEditor && (u.id !== selectedSupervisor || u.id === NONE))
        .map(({id, userName}) => (
          <MenuItem key={id} value={id}>
            {userName === NONE ? t('managementPanel.noUser') : userName}
          </MenuItem>
        )),
    [tileUsers, t, selectedSupervisor],
  );

  const dropdownSupervisors = useMemo(
    () =>
      tileUsers
        .filter(u => u.isSupervisor && (u.id !== selectedUser || u.id === NONE))
        .map(({id, userName}) => (
          <MenuItem key={id} value={id}>
            {userName === NONE ? t('managementPanel.noUser') : userName}
          </MenuItem>
        )),
    [tileUsers, t, selectedUser],
  );

  const handleSave = async () => {
    try {
      initState();

      const response = await api.tileUpdateUsersUpdate(
        selectedTileId,
        {
          ...(selectedUser !== NONE ? {editorId: selectedUser} : {}),
          ...(selectedSupervisor !== NONE ? {supervisorId: selectedSupervisor} : {}),
        },
        {headers: basicHeaders()},
      );

      if (response.status === 200) {
        dispatch(NotificationActions.success((response.data as unknown as Record<string, string>).value));

        const resp = await getTileUserAssignmentInfo(selectedTileId);
        const userList = fulfillTileUsers(resp.data.users);

        setTiles(
          tiles.map(t => ({
            ...t,
            usersCount:
              t.id === selectedTileId ? (selectedUser === NONE && selectedSupervisor === NONE ? 0 : 1) : t.usersCount,
          })),
        );

        setTileUsers(userList);
      } else {
        dispatch(NotificationActions.error(t('unrecognizedProblem')));
      }
      userSelectedState();
    } catch (error) {
      exception(error);
      userSelectedState();
    }
  };

  const handleUserChanged = (id: string) => {
    setTileUsers(tileUsers.map(u => ({...u, isAssigned: u.id === id})));
  };

  const handleSupervisorChanged = (id: string) => {
    setTileUsers(tileUsers.map(u => ({...u, isAssignedAsSupervisor: u.id === id})));
  };

  return (
    <Dashboard>
      <div className="management-panel">
        <div className="management-panel__head">
          <H3Title title="Management panel" />
          <div className="tile-assignment">
            <H4Title title={t('managementPanel.assignUserToTile')} />
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
            {(!usersLoaded && <CircularProgress />) || (
              <>
                {!!dropdownUsers.length && (
                  <TextField
                    id={'select-user-id'}
                    variant={'filled'}
                    select
                    label={t('managementPanel.editor')}
                    value={selectedUser}
                    onChange={e => handleUserChanged(e.target.value)}
                    margin="normal"
                    fullWidth
                    disabled={!!tiles.find(t => t.id === selectedTileId)?.approvedByEditor}>
                    {dropdownUsers}
                  </TextField>
                )}
                {!!dropdownSupervisors.length && (
                  <TextField
                    id={'select-user-id'}
                    variant={'filled'}
                    select
                    label={t('managementPanel.supervisor')}
                    value={selectedSupervisor}
                    onChange={e => handleSupervisorChanged(e.target.value)}
                    margin="normal"
                    fullWidth
                    disabled={!!tiles.find(t => t.id === selectedTileId)?.approvedBySupervisor}>
                    {dropdownSupervisors}
                  </TextField>
                )}
              </>
            )}
            <Button
              className="tile-assignment__button"
              onClick={handleSave}
              color="primary"
              variant="contained"
              disabled={!userSelected || selectedUser === NONE || selectedSupervisor === NONE}
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
