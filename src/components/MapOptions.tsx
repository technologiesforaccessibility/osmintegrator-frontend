import 'stylesheets/mapPanel.scss';

import SettingsIcon from '@mui/icons-material/Settings';
import { ToggleButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { FC } from 'react';

type TMapOptionsProps = {
  handleClick: () => void;
};

const MapOptions: FC<TMapOptionsProps> = ({ handleClick }) => {
  return (
    <ToggleButton
      value="check"
      className="map-panel__toggle--back"
      selected={false}
      size="small"
      onChange={handleClick}
      color={'primary'}>
      <Tooltip title={'Ustawienia mapy'}>
        <SettingsIcon />
      </Tooltip>
    </ToggleButton>
  );
};

export default MapOptions;
