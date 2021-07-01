import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';

import SidebarListItem from './SidebarListItem';
import {UserContext} from './contexts/UserContextProvider';

const {REACT_APP_CONTACT_FORM} = process.env;

const SidebarMenu = () => {
  const {t} = useTranslation();
  const {isUnsafeAuthorized} = useContext(UserContext);

  return (
    <ul className="nav flex-column">
      <SidebarListItem name="Map" link="/" />
      <SidebarListItem name="Profile" link="/profile" />
      <SidebarListItem name="History" link="/" />
      <SidebarListItem externalLink name={t('sidebar.contact')} link={REACT_APP_CONTACT_FORM} />
      {isUnsafeAuthorized && <SidebarListItem name="Management dashboard" link="/manage" />}
    </ul>
  );
};

export default SidebarMenu;
