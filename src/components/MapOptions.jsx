import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';

const MapOptions = ({handleClick}) => {
  return (
    <div style={{alignSelf: 'center'}}>
      <Tooltip title={'Ustawienia mapy'}>
        <SettingsIcon onClick={() => handleClick()} />
      </Tooltip>
    </div>
  );
};

export default MapOptions;
