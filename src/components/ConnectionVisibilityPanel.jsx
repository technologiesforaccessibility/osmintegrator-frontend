import {useContext} from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Tooltip from '@mui/material/Tooltip';
import {useTranslation} from 'react-i18next';

import {MapContext} from './contexts/MapContextProvider';

import {connectionVisibilityTexts, connectedStopVisibilityProps} from '../utilities/constants';

import '../stylesheets/connectionVisibilityPanel.scss';

const ConnectionVisibilityPanel = () => {
  const {t} = useTranslation();
  const {connectedStopVisibility, setConnectedStopVisibility, unconnectedStopVisibility, setUnconnectedStopVisibility} =
    useContext(MapContext);

  const handleStopVisibilityChange = (_, newVisibility) => {
    setConnectedStopVisibility(newVisibility);
  };

  const handleNoConnectedStopVisibilityChange = (_, newVisibility) => {
    setUnconnectedStopVisibility(newVisibility);
  };

  return (
    <>
      <div className="connection-visibility-panel__container">
        <div className="connection-visibility-panel__toggle-group-container">
          {t('connectionVisibility.nameConnected')}{' '}
          <ToggleButtonGroup
            className="connection-visibility-panel__toggle-group"
            value={connectedStopVisibility}
            exclusive
            color="primary"
            onChange={handleStopVisibilityChange}>
            <ToggleButton
              className="connection-visibility-panel__toggle--modes"
              value={connectedStopVisibilityProps.hidden}
              color="primary">
              <Tooltip title={connectionVisibilityTexts.hidden}>
                <StarOutlineIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton
              className="connection-visibility-panel__toggle--modes"
              value={connectedStopVisibilityProps.semiTransparent}
              color="primary">
              <Tooltip title={connectionVisibilityTexts.semiTransparent}>
                <StarHalfIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton
              className="connection-visibility-panel__toggle--modes"
              value={connectedStopVisibilityProps.visible}
              color="primary">
              <Tooltip title={connectionVisibilityTexts.visible}>
                <StarIcon />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="connection-visibility-panel__toggle-group-container">
          {t('connectionVisibility.nameUnconnected')}{' '}
          <ToggleButtonGroup
            className="connection-visibility-panel__toggle-group"
            value={unconnectedStopVisibility}
            exclusive
            color="primary"
            onChange={handleNoConnectedStopVisibilityChange}>
            <ToggleButton
              className="connection-visibility-panel__toggle--modes"
              value={connectedStopVisibilityProps.hidden}
              color="primary">
              <Tooltip title={connectionVisibilityTexts.hidden}>
                <StarOutlineIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton
              className="connection-visibility-panel__toggle--modes"
              value={connectedStopVisibilityProps.semiTransparent}
              color="primary">
              <Tooltip title={connectionVisibilityTexts.semiTransparent}>
                <StarHalfIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton
              className="connection-visibility-panel__toggle--modes"
              value={connectedStopVisibilityProps.visible}
              color="primary">
              <Tooltip title={connectionVisibilityTexts.visible}>
                <StarIcon />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    </>
  );
};

export default ConnectionVisibilityPanel;
