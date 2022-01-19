import {useCallback, useEffect, useMemo, useState} from 'react';
import {Rectangle, Tooltip} from 'react-leaflet';
import TextPath from 'react-leaflet-textpath';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {CircularProgress, TextField} from '@mui/material';

import api from '../api/apiInstance';
import {Tile, User} from '../api/apiClient';
import {basicHeaders} from '../config/apiConfig';
import H3Title from '../components/customs/H3Title';
import ManagementPanelMap from '../components/managementPanel/ManagementPanelMap';
import DashboardWrapper from '../components/DashboardWrapper';
import RoleAssignmentPanel from '../components/managementPanel/RoleAssignmentPanel';
import H4Title from '../components/customs/H4Title';
import {NotificationActions} from '../redux/actions/notificationActions';
import {exception} from '../utilities/exceptionHelper';

import colors from '../stylesheets/config/colors.module.scss';
import '../stylesheets/managementPanel.scss';
import {roles} from '../utilities/constants';

const NONE = 'none';
const CURRENT_LOCATION = {lat: 50.29, lng: 19.01};
const ZOOM = 9;

function ManagementPanel() {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [tiles, setTiles] = useState<Tile[]>([]);
  const [editors, setEditors] = useState<User[]>([]);

  const [dataLoaded, setDataLoaded] = useState(false);

  const [selectedEditor, setSelectedEditor] = useState<User>();
  const [selectedTile, setSelectedTile] = useState<Tile>();

  const initState = () => {
    setDataLoaded(false);
  };

  const readyState = () => {
    setDataLoaded(true);
  };

  useEffect(() => {
    const getInitialState = async () => {
      initState();
      try {
        const t = await getTiles();
        const u = await getEditors();

        setTiles(t || []);
        setEditors(u || []);
      } catch (e) {
        exception(e);
      } finally {
        readyState();
      }
    };

    getInitialState();
  }, []);

  const getEditors = async () => {
    try {
      const response = await api.rolesUsersDetail(roles.EDITOR, {
        headers: basicHeaders(),
      });
      return response.data;
    } catch (error) {
      exception(error);
    }
  };

  const getTiles = async () => {
    try {
      const response = await api.tileGetUncommitedTilesList({
        headers: basicHeaders(),
      });
      return response.data;
    } catch (error) {
      exception(error);
    }
  };

  const getColor = useCallback(
    (id: string, usersCount: number, approvedByEditor: Boolean) => {
      if (selectedTile !== null && selectedTile?.id === id) {
        return colors.colorTileActiveExplicit;
      }
      if (approvedByEditor) {
        return colors.colorApprovedByEditor;
      }
      if (!!usersCount) return colors.colorTileAssigned;
      return colors.colorTileAll;
    },
    [selectedTile],
  );

  const handleTileSelected = useCallback(
    (tileId: string) => {
      const tile = tiles.find(t => t.id === tileId);
      const assignedEditor = editors.find(e => e.userName === tile?.assignedUserName);

      setSelectedTile(tile);
      setSelectedEditor(assignedEditor);
    },
    [editors, tiles],
  );

  const mapTiles = useMemo(
    () =>
      tiles.map(
        ({
          id,
          maxLat,
          maxLon,
          minLat,
          minLon,
          x,
          y,
          usersCount,
          approvedByEditor,
          assignedUserName,
          gtfsStopsCount,
          unconnectedGtfsStops,
        }) => (
          <>
            <TextPath
              positions={[
                [maxLat, minLon],
                [minLat, maxLon],
              ]}
              text={`${unconnectedGtfsStops}/${gtfsStopsCount}`}
              color=""
              orientation={-45}
              center
            />
            <Rectangle
              key={`map-${id}`}
              bounds={[
                [maxLat - 0.001, maxLon - 0.0015],
                [minLat + 0.001, minLon + 0.0015],
              ]}
              pathOptions={{
                color: getColor(id, usersCount || 0, approvedByEditor),
              }}
              eventHandlers={{
                click: () => {
                  handleTileSelected(id);
                },
              }}>
              <Tooltip direction="top">
                X: {x}, Y: {y} <br />
                {t('managementPanel.assigned')}: {assignedUserName ? assignedUserName : '-'} <br />
              </Tooltip>
            </Rectangle>
          </>
        ),
      ),
    [tiles, getColor, handleTileSelected, t],
  );

  const tilesDropDown = useMemo(
    () =>
      tiles.map(({id, x, y}) => (
        <MenuItem key={`tile-dropdown-${id}`} value={id}>
          X: {x}, Y: {y}
        </MenuItem>
      )),
    [tiles],
  );

  const dropdownEditors = useMemo(
    () =>
      editors.map(({id, userName}) => (
        <MenuItem key={id} value={id}>
          {userName === NONE ? t('managementPanel.noUser') : userName}
        </MenuItem>
      )),
    [editors, t],
  );

  const handleSave = async () => {
    try {
      initState();

      const response = await api.tileUpdateUsersUpdate(
        selectedTile!.id,
        {
          editorId: selectedEditor!.id,
        },
        {headers: basicHeaders()},
      );

      if (response.status === 200) {
        dispatch(NotificationActions.success((response.data as unknown as Record<string, string>).value));

        const tiles = await getTiles();

        setTiles(tiles || []);
      } else {
        dispatch(NotificationActions.error(t('unrecognizedProblem')));
      }
    } catch (error) {
      exception(error);
    } finally {
      readyState();
    }
  };

  const handleEditorChanged = (id: string) => {
    const editor = editors.find(e => e.id === id);
    setSelectedEditor(editor);
  };

  return (
    <DashboardWrapper>
      <div className="management-panel">
        <div className="management-panel__head">
          <H3Title title="Management panel" />
          <div className="tile-assignment">
            <H4Title title={t('managementPanel.assignUserToTile')} />
            {((!dataLoaded || !tilesDropDown) && <CircularProgress className="tile-assignment__tile-dropdown" />) || (
              <TextField
                id={'select-tile-id'}
                variant={'filled'}
                select
                label={t('managementPanel.selectTile')}
                value={selectedTile?.id ?? ''}
                onChange={e => handleTileSelected(e.target.value)}
                margin="normal"
                fullWidth>
                {tilesDropDown}
              </TextField>
            )}
            {dataLoaded && selectedTile && dropdownEditors.length && (
              <>
                <TextField
                  id={'select-user-id'}
                  variant={'filled'}
                  select
                  label={t('managementPanel.editor')}
                  value={selectedEditor?.id ?? ''}
                  onChange={e => handleEditorChanged(e.target.value)}
                  margin="normal"
                  fullWidth>
                  {dropdownEditors}
                </TextField>
              </>
            )}
            <Button
              className="tile-assignment__button"
              onClick={handleSave}
              color="primary"
              variant="contained"
              disabled={!selectedTile && !selectedEditor}
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
    </DashboardWrapper>
  );
}

export default ManagementPanel;
