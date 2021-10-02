import {useContext} from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Tooltip from '@material-ui/core/Tooltip';
import {useTranslation} from 'react-i18next';

import {MapContext} from './contexts/MapContextProvider';

import {connectedStopsVisibility, connectionVisibilityProps} from '../utilities/constants';

const ConnectionVisibilityPanel = () => {
  const {t} = useTranslation();
  const {connectionVisibility, setConnectionVisibility} = useContext(MapContext);

  const handleChange = (_, newVisibility) => {
    setConnectionVisibility(newVisibility);
  };

  return (
    <>
      <div className="connection-visibility-panel__container">
        <div>
          {t('connectionVisibility.name')}{' '}
          <ToggleButtonGroup
            className="connection-visibility-panel__toggle-group"
            value={connectionVisibility}
            exclusive
            color="primary"
            onChange={handleChange}>
            <ToggleButton
              className="connection-visibility-panel__toggle--modes"
              value={connectionVisibilityProps.visible}
              color="primary">
              <Tooltip title={connectedStopsVisibility.visible}>
                <StarIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton
              className="connection-visibility-panel__toggle--modes"
              value={connectionVisibilityProps.semiTransparent}
              color="primary">
              <Tooltip title={connectedStopsVisibility.semiTransparent}>
                <StarHalfIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton
              className="connection-visibility-panel__toggle--modes"
              value={connectionVisibilityProps.hidden}
              color="primary">
              <Tooltip title={connectedStopsVisibility.hidden}>
                <StarOutlineIcon />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div>{/* Todo: Connection Lines visivility */}</div>
      </div>
    </>
  );
};

export default ConnectionVisibilityPanel;
