import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@material-ui/core/Tooltip';

const MapOptions = ({handleClick}) => {
  return (
    <div>
      <Tooltip title={'Ustawienia mapy'}>
        <SettingsIcon onClick={() => handleClick()} />
      </Tooltip>
    </div>
  );
};

export default MapOptions;
