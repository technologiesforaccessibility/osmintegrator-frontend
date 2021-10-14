import {useContext} from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';

import {MapContext} from './contexts/MapContextProvider';

import {connectionVisibility} from '../utilities/constants';

import '../stylesheets/connectionVisibilityPanel.scss';

const ConnectionVisibilityPanel = () => {
  const {visibilityOptions, setVisibilityOptions} = useContext(MapContext);

  const handleChange = (key, newValue) => {
    if (!newValue) {
      return;
    }

    setVisibilityOptions({
      ...visibilityOptions,
      [key]: {
        ...visibilityOptions[key],
        value: newValue,
      },
    });
  };

  return (
    <>
      <div className="connection-visibility-panel__container">
        {Object.entries(visibilityOptions).map(([key, value]) => (
          <div className="connection-visibility-panel__toggle-group-container" key={key}>
            {value.name || ''}{' '}
            <ToggleButtonGroup
              className="connection-visibility-panel__toggle-group"
              value={value.value}
              exclusive
              color="primary"
              onChange={(_, newValue) => handleChange(key, newValue)}>
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
      </div>
    </>
  );
};

export default ConnectionVisibilityPanel;
