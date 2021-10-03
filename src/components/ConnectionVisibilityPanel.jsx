import {useContext} from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Tooltip from '@material-ui/core/Tooltip';
import {useTranslation} from 'react-i18next';

import {MapContext} from './contexts/MapContextProvider';

import {
  connectionVisibilityTexts,
  connectedStopVisibilityProps,
  connectionLineVisibilityProps,
} from '../utilities/constants';

import '../stylesheets/connectionVisibilityPanel.scss';

const ConnectionVisibilityPanel = () => {
  const {t} = useTranslation();
  const {connectedStopVisibility, setConnectedStopVisibility, connectionLineVisbility, setConnectionLineVisbility} =
    useContext(MapContext);

  const handleStopVisibilityChange = (_, newVisibility) => {
    setConnectedStopVisibility(newVisibility);
  };

  const handleLineVisibilityChange = (_, newLineVisibility) => {
    setConnectionLineVisbility(newLineVisibility);
  };

  return (
    <>
      <div className="connection-visibility-panel__container">
        <div className="connection-visibility-panel__toggle-group-container">
          {t('connectionVisibility.name')}{' '}
          <ToggleButtonGroup
            className="connection-visibility-panel__toggle-group"
            value={connectedStopVisibility}
            exclusive
            color="primary"
            onChange={handleStopVisibilityChange}>
            <ToggleButton
              className="connection-visibility-panel__toggle--modes"
              value={connectedStopVisibilityProps.visible}
              color="primary">
              <Tooltip title={connectionVisibilityTexts.visible}>
                <StarIcon />
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
              value={connectedStopVisibilityProps.hidden}
              color="primary">
              <Tooltip title={connectionVisibilityTexts.hidden}>
                <StarOutlineIcon />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="connection-visibility-panel__toggle-group-container">
          {t('connectionVisibility.connectionLines')}{' '}
          <ToggleButtonGroup
            className="connection-visibility-panel__toggle-group"
            value={connectionLineVisbility}
            exclusive
            color="primary"
            onChange={handleLineVisibilityChange}>
            <ToggleButton
              className="connection-visibility-panel__toggle--modes"
              value={connectionLineVisibilityProps.visible}
              color="primary">
              <Tooltip title={connectionVisibilityTexts.visible}>
                <StarIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton
              className="connection-visibility-panel__toggle--modes"
              value={connectionLineVisibilityProps.hidden}
              color="primary">
              <Tooltip title={connectionVisibilityTexts.hidden}>
                <StarOutlineIcon />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="connection-visibility-panel__map-warning-container">
          {connectionLineVisbility === connectionLineVisibilityProps.hidden &&
            connectedStopVisibility !== connectedStopVisibilityProps.hidden && (
              <p className="connection-visibility-panel__map-warning">
                {t('connectionVisibility.hiddenConnectionLinesWarning')}
              </p>
            )}
        </div>
      </div>
    </>
  );
};

export default ConnectionVisibilityPanel;
