import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import { Button, Grid, Modal } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

import { MapContext } from './contexts/MapContextProvider';
import { connectionVisibility } from '../utilities/constants';

import '../stylesheets/connectionVisibilityPanel.scss';
import { modalStyle } from '../stylesheets/sharedStyles';

const ConnectionVisibilityPanel = ({ handleClose }) => {
  const { visibilityOptions, setVisibilityOptions, resetMapVisibility } = useContext(MapContext);
  const { t } = useTranslation();
  const [childModal, setChildModal] = useState(false);

  const handleChange = (key, newValue, storageItem) => {
    if (!newValue) {
      return;
    }
    localStorage.setItem(storageItem, JSON.stringify(newValue));

    setVisibilityOptions({ ...visibilityOptions, [key]: { ...visibilityOptions[key], value: newValue } });
  };

  const handleModal = value => {
    setChildModal(value);
  };
  const handleReset = () => {
    resetMapVisibility();
    handleModal(false);
  };

  return (
    <>
      <div className="connection-visibility-panel__container">
        <CloseIcon className="connection-visibility-panel__close" onClick={handleClose} />
        <p className="connection-visibility-panel__header">{t('connectionVisibility.header')}</p>
        {Object.entries(visibilityOptions).map(([key, value]) => (
          <div className="connection-visibility-panel__toggle-group-container" key={key}>
            {value.name || ''}{' '}
            <ToggleButtonGroup
              className="connection-visibility-panel__toggle-group"
              value={value.value}
              exclusive
              color="primary"
              onChange={(_, newValue) => handleChange(key, newValue, value.localStorageName)}>
              {Object.values(connectionVisibility).map((val, index) => (
                <ToggleButton
                  className="connection-visibility-panel__toggle--modes"
                  value={val}
                  color="primary"
                  key={`${key}_${index}`}>
                  <Tooltip title={val.text}>{(val.icon && val.icon()) || null}</Tooltip>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
        ))}
        <Grid container justifyContent="flex-end" pt={1}>
          <Button onClick={() => handleModal(true)} variant="contained">
            {t('connectionVisibility.resetButton')}
          </Button>
        </Grid>

        <Modal open={childModal}>
          <Box sx={modalStyle}>
            <p>{t('connectionVisibility.resetInfo')}</p>
            <Grid container justifyContent="space-evenly" pt={2}>
              <Button onClick={() => handleModal(false)} variant="outlined">
                {t('no')}
              </Button>
              <Button onClick={handleReset} variant="contained">
                {t('yes')}
              </Button>
            </Grid>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ConnectionVisibilityPanel;
