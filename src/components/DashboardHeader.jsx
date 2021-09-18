import { useTranslation } from 'react-i18next';

import { paths } from '../utilities/constants';

import { Button, IconButton } from '@material-ui/core/';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import Tooltip from '@mui/material/Tooltip';
import MapIcon from '@mui/icons-material/Map';
import BuildIcon from '@mui/icons-material/Build';

import './../stylesheets/dashboardHeader.scss';

const { REACT_APP_CONTACT_FORM } = process.env;

const DashboardHeader = ({ isLoggedIn }) => {
  const { t } = useTranslation();

  return (
    <div className="dashboard-header">
      <div className="dashboard-header__logo">
        <div className="dashboard-header--button-box">
          <Button
            color="primary"
            variant="outlined"
            href={window.location.href}>
            OSM INTEGRATOR
          </Button>
        </div>
      </div>

      <div className="dashboard-header__rest">
        <div className="dashboard-header--button-box">
          <Button
            variant="contained"
            startIcon={<MapIcon />}
            href={paths.HOME}
            className="dashboard-header__rest--button">
            {t('sidebar.map')}
          </Button>
        </div>

        <div className="dashboard-header--button-box">
          <Button
            color="primary"
            variant="contained"
            startIcon={<BuildIcon />}
            href={paths.MANAGEMENT_PANEL}
            className="dashboard-header__rest--button">
            {t('sidebar.managementDashboard')}
          </Button>
        </div>

        <div className="dashboard-header--button-box">
          <Button
            color="primary"
            variant="contained"
            startIcon={<ChatIcon />}
            href={REACT_APP_CONTACT_FORM}
            className="dashboard-header__rest--button">
            {t('sidebar.contact')}
          </Button>
        </div>

        <Tooltip title={t('sidebar.profile')} >
          <IconButton
            color="primary"
            href={paths.PROFILE}>
            <AccountCircleIcon fontSize="medium" />
          </IconButton>
        </Tooltip>

        <Tooltip title={t('logout.button')}>
          <IconButton
            color="primary"
            href={paths.LOGOUT}
          >
            <LogoutIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default DashboardHeader;
