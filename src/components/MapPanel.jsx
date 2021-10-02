import {useContext, useState} from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ReportIcon from '@material-ui/icons/Report';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useTranslation} from 'react-i18next';
import ConnectionVisibilityPanel from './ConnectionVisibilityPanel';
import MapOptions from './MapOptions';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import {MapContext} from './contexts/MapContextProvider';

import '../stylesheets/mapPanel.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MapPanel = () => {
  const {isTileActive, singleTileToggle, viewModeToggle, reportModeToggle, connectionModeToggle, hideTileElements} =
    useContext(MapContext);
  const [toggleButton, setToggleButton] = useState('View');
  const {t} = useTranslation();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const radios = [
    {
      title: t('tileModePrompts.view'),
      name: 'View',
      icon: () => <VisibilityIcon />,
    },
    {
      title: t('tileModePrompts.report'),
      name: 'Report',
      icon: () => <ReportIcon />,
    },
    {
      title: t('tileModePrompts.connection'),
      name: 'Connection',
      icon: () => <SettingsEthernetIcon />,
    },
  ];

  const handleChange = (_, value) => {
    setToggleButton(value);
    switch (value) {
      case 'View':
        viewModeToggle();
        break;
      case 'Report':
        reportModeToggle();
        break;
      case 'Connection':
        connectionModeToggle();
        break;
      default:
        break;
    }
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
              onChange={() => {
                singleTileToggle(false);
                hideTileElements();
              }}>
              <Tooltip title={t('tileModePrompts.back')}>
                <ArrowBackIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButtonGroup
              className="map-panel__toggle-group"
              value={toggleButton}
              exclusive
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
              <Box sx={style}>
                <ConnectionVisibilityPanel />
              </Box>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
};

export default MapPanel;
