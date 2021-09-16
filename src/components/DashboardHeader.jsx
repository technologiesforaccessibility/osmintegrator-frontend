import {useTranslation} from 'react-i18next';

import MenuItem from './MenuItem';
import {paths} from '../utilities/constants';

import './../stylesheets/dashboardHeader.scss';

const {REACT_APP_CONTACT_FORM} = process.env;

const DashboardHeader = ({isLoggedIn}) => {
  const {t} = useTranslation();

  return (
    <header className="navbar navbar-dark bg-dark p-0 header__main">
      <div className="header__logo">
        <a href={window.location.href}>Osm Integrator</a>
      </div>

      <div className="header__navigation-container">
        <MenuItem name={t('sidebar.map')} link={paths.HOME} />
        <MenuItem name={t('sidebar.profile')} link={paths.PROFILE} />
        <MenuItem externalLink name={t('sidebar.contact')} link={REACT_APP_CONTACT_FORM} />
        <MenuItem name={t('sidebar.managementDashbord')} link={paths.MANAGEMENT_PANEL} />
        {isLoggedIn ? (
          <MenuItem name={t('logout.button')} link={paths.LOGOUT} />
        ) : (
          <MenuItem name={t('logout.loginButton')} link={paths.LOGIN} />
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
