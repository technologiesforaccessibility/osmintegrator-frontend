import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';

import SidebarListItem from './SidebarListItem';
import {UserContext} from './contexts/UserContextProvider';
import {paths} from '../utilities/constants';

const {REACT_APP_CONTACT_FORM} = process.env;

const SidebarMenu = () => {
  const {t} = useTranslation();
  const {isUnsafeAuthorized} = useContext(UserContext);

  return (
    <ul className="nav flex-column">
      <SidebarListItem name="Map" link={paths.HOME} />
      <SidebarListItem name="Profile" link={paths.PROFILE} />
      <SidebarListItem name="History" link={paths.HOME} />
      <SidebarListItem externalLink name={t('sidebar.contact')} link={REACT_APP_CONTACT_FORM} />
      {isUnsafeAuthorized && <SidebarListItem name="Management dashboard" link={paths.MANAGEMENT_PANEL} />}
    </ul>
  );
};

export default SidebarMenu;
