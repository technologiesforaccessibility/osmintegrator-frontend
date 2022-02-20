import {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReportIcon from '@mui/icons-material/Report';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CropSquareTwoToneIcon from '@mui/icons-material/CropSquareTwoTone';
import SyncIcon from '@mui/icons-material/Sync';
import {ReactComponent as ConnectionIcon} from '../assets/connection-panel-icon.svg';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import {MapContext, MapModes} from './contexts/MapContextProvider';
import ConnectionVisibilityPanel from './ConnectionVisibilityPanel';
import MapOptions from './MapOptions';

import '../stylesheets/mapPanel.scss';
import {modalStyle} from '../stylesheets/sharedStyles';

const MapPanel = () => {
  const {
    isTileActive,
    singleTileToggle,
    mapMode,
    toogleMapMode,
    hideTileElements,
    resetMapSettings,
    setNewReportCoordinates,
    setActiveStop,
    setRerenderTiles,
  } = useContext(MapContext);
  const {t} = useTranslation();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const radios = [
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

  const handleChange = (_, value) => {
    toogleMapMode(value);
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
                setNewReportCoordinates({lat: null, lon: null});
                setActiveStop(null);
                setRerenderTiles(true);
              }}>
              <Tooltip title={t('tileModePrompts.back')}>
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
              {radios.map(({title, name, icon}, index) => (
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
                <ConnectionVisibilityPanel handleClose={handleClose} />
              </Box>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
};

export default MapPanel;
