import './mapPanel.scss';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CropSquareTwoToneIcon from '@mui/icons-material/CropSquareTwoTone';
import PanToolIcon from '@mui/icons-material/PanTool';
import ReportIcon from '@mui/icons-material/Report';
import SyncIcon from '@mui/icons-material/Sync';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import { ReactComponent as ConnectionIcon } from 'assets/connection-panel-icon.svg';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { modalStyle } from 'stylesheets/sharedStyles';
import { MapModes } from 'utilities/MapContextState';

import VisibilityPanel from '../../connections/VisibilityPanel/VisibilityPanel';
import { MapContext } from '../../contexts/MapContextProvider';
import MapOptions from './MapOptions';

const MapPanel = () => {
  const {
    isTileActive,
    singleTileToggle,
    mapMode,
    toggleMapMode,
    hideTileElements,
    resetMapSettings,
    setNewReportCoordinates,
    setActiveStop,
    setRerenderTiles,
    reset,
  } = useContext(MapContext);
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [lastSelectedMenuItem, setLastMenuItem] = useState<string>(MapModes.view);

  const menuItems = [
    {
      title: t('tileModePrompts.view'),
      name: MapModes.view,
      icon: () => <VisibilityIcon />,
    },
    {
      title: t('tileModePrompts.report'),
      name: MapModes.report,
      icon: () => <ReportIcon />,
    },
    {
      title: t('tileModePrompts.move'),
      name: MapModes.pan,
      icon: () => <PanToolIcon />,
    },
    {
      title: t('tileModePrompts.connection'),
      name: MapModes.connection,
      icon: () => <ConnectionIcon />,
    },
    {
      title: t('tileModePrompts.tile'),
      name: MapModes.tile,
      icon: () => <CropSquareTwoToneIcon />,
    },
    {
      title: t('tileModePrompts.sync'),
      name: MapModes.sync,
      icon: () => <SyncIcon />,
    },
  ];

  const handleChange = (_: unknown, currentMenuItem: string) => {
    toggleMapMode(currentMenuItem);
    reset(lastSelectedMenuItem);
    setLastMenuItem(currentMenuItem);
  };

  return (
    <>
      {isTileActive && (
        <div className="map-panel__container">
          <div className="map-panel__toggle-container">
            <ToggleButton
              value="check"
              className="map-panel__toggle--back"
              selected={false}
              size="small"
              onChange={() => {
                singleTileToggle(false);
                hideTileElements();
                resetMapSettings();
                setNewReportCoordinates({ lat: null, lon: null });
                setActiveStop(null);
                setRerenderTiles(true);
              }}>
              <Tooltip title={t('tileModePrompts.back') as string}>
                <ArrowBackIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButtonGroup
              className="map-panel__toggle-group"
              value={mapMode}
              exclusive
              size="small"
              color="primary"
              onChange={handleChange}>
              {menuItems.map(({ title, name, icon }, index) => (
                <ToggleButton className="map-panel__toggle--modes" key={index} value={name} color="primary">
                  <Tooltip title={title}>{icon()}</Tooltip>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <MapOptions handleClick={handleOpen} />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <Box sx={modalStyle}>
                <VisibilityPanel handleClose={handleClose} />
              </Box>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
};

export default MapPanel;
