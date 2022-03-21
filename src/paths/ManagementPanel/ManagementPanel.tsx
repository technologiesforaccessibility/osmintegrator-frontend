import './managementPanel.scss';

import { CircularProgress, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Tile, UncommittedTile, User } from 'api/apiClient';
import api from 'api/apiInstance';
import H3Title from 'components/customs/H3Title';
import H4Title from 'components/customs/H4Title';
import DashboardWrapper from 'components/DashboardWrapper/DashboardWrapper';
import ManagementPanelMap from 'components/managementPanel/ManagementPanelMap';
import ManagementPanelStops from 'components/managementPanel/ManagementPanelStops';
import RoleAssignmentPanel from 'components/managementPanel/RoleAssignmentPanel';
import { basicHeaders } from 'config/apiConfig';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Rectangle, Tooltip } from 'react-leaflet';
import TextPath from 'react-leaflet-textpath';
import { useDispatch } from 'react-redux';
import { NotificationActions } from 'redux/actions/notificationActions';
import colors from 'stylesheets/config/colors.module.scss';
import { roles } from 'utilities/constants';
import { exception } from 'utilities/exceptionHelper';

const NONE = 'none';
const CURRENT_LOCATION = { lat: 50.29, lng: 19.01 };
const ZOOM = 9;

function ManagementPanel() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [tiles, setTiles] = useState<UncommittedTile[]>([]);
  const [editors, setEditors] = useState<User[]>([]);

  const [dataLoaded, setDataLoaded] = useState(false);

  const [selectedEditor, setSelectedEditor] = useState<User>();
  const [selectedTile, setSelectedTile] = useState<UncommittedTile>();

  const initState = () => {
    setDataLoaded(false);
  };

  const readyState = () => {
    setDataLoaded(true);
  };

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
      const response = await api.tileGetUncommittedTilesList({
        headers: basicHeaders(),
      });
      return response.data;
    } catch (error) {
      exception(error);
    }
  };

  useEffect(() => {
    const getInitialState = async () => {
      initState();
      try {
        const fetchedTiles = await getTiles();
        const fetchedEditors = await getEditors();

        setTiles(fetchedTiles || []);
        setEditors(fetchedEditors || []);
      } catch (e) {
        exception(e);
      } finally {
        readyState();
      }
    };

    getInitialState();
  }, []);

  const getColor = useCallback(
    (tile: Tile | UncommittedTile) => {
      if (selectedTile?.id === tile.id) {
        return colors.colorTileActiveExplicit;
      }
      if (tile.assignedUserName) return colors.colorTileAssigned;
      return colors.colorTileAll;
    },
    [selectedTile],
  );

  const handleTileSelected = useCallback(
    (tileId: string) => {
      const tile = tiles.find(currentTile => currentTile.id === tileId);
      const assignedEditor = editors.find(e => e.userName === tile?.assignedUserName);

      setSelectedTile(tile);
      setSelectedEditor(assignedEditor);
    },
    [editors, tiles],
  );

  const mapTiles = useMemo(
    () =>
      tiles.map(x => (
        <React.Fragment key={x.id}>
          <TextPath
            positions={[
              [x.minLat + (x.maxLat - x.minLat) / 2, x.minLon],
              [x.minLat + (x.maxLat - x.minLat) / 2, x.maxLon],
            ]}
            text={`${x.unconnectedGtfsStopsCount}/${x.gtfsStopsCount}`}
            color=""
            center
          />
          <Rectangle
            key={`map-${x.id}`}
            bounds={[
              [x.maxLat - 0.001, x.maxLon - 0.0015],
              [x.minLat + 0.001, x.minLon + 0.0015],
            ]}
            pathOptions={{
              color: getColor(x),
            }}
            eventHandlers={{
              click: () => {
                handleTileSelected(x.id);
              },
            }}>
            <Tooltip direction="top">
              X: {x.x}, Y: {x.y} <br />
              {t('managementPanel.assigned')}: {x.assignedUserName ? x.assignedUserName : '-'} <br />
            </Tooltip>
          </Rectangle>
        </React.Fragment>
      )),
    [tiles, getColor, handleTileSelected, t],
  );

  const tilesDropDown = useMemo(
    () =>
      tiles.map(({ id, x, y }) => (
        <MenuItem key={`tile-dropdown-${id}`} value={id}>
          X: {x}, Y: {y}
        </MenuItem>
      )),
    [tiles],
  );

  const dropdownEditors = useMemo(
    () =>
      editors.map(({ id, userName }) => (
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
        { headers: basicHeaders() },
      );

      if (response.status === 200) {
        dispatch(NotificationActions.success((response.data as unknown as Record<string, string>).value));

        const fetchedTiles = await getTiles();

        setTiles(fetchedTiles || []);
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
          <ManagementPanelStops />
        </div>
        <div className="management-panel__map">
          <ManagementPanelMap startPoint={CURRENT_LOCATION} zoom={ZOOM} tiles={mapTiles} />
        </div>
      </div>
    </DashboardWrapper>
  );
}

export default ManagementPanel;
