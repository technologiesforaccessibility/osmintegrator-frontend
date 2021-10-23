import {useContext, useState} from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReportIcon from '@mui/icons-material/Report';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import {selectLoggedInUserRoles} from '../redux/selectors/authSelector';
import {MapContext, MapModes} from './contexts/MapContextProvider';
import ConnectionVisibilityPanel from './ConnectionVisibilityPanel';
import MapOptions from './MapOptions';
import {roles} from '../utilities/constants';

import '../stylesheets/mapPanel.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MapPanel = () => {
  const {isTileActive, singleTileToggle, mapMode, toogleMapMode, hideTileElements, resetMapSettings} =
    useContext(MapContext);
  const {t} = useTranslation();
  const authRoles = useSelector(selectLoggedInUserRoles);

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
      icon: () => <SettingsEthernetIcon />,
    },
    ...(((authRoles || []).includes(roles.SUPERVISOR) && [
      {
        title: t('tileModePrompts.approveConnections'),
        name: MapModes.approveConnections,
        icon: () => <AssignmentTurnedInIcon />,
      },
    ]) ||
      []),
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
              onChange={() => {
                singleTileToggle(false);
                hideTileElements();
                resetMapSettings();
              }}>
              <Tooltip title={t('tileModePrompts.back')}>
                <ArrowBackIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButtonGroup
              className="map-panel__toggle-group"
              value={mapMode}
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
                <ConnectionVisibilityPanel modalStyle={style} handleClose={handleClose} />
              </Box>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
};

export default MapPanel;
