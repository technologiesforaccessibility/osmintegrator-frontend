import React from 'react';
import {useTranslation} from 'react-i18next';

import SidebarListItem from './SidebarListItem';
import {paths} from '../utilities/constants';

const {REACT_APP_CONTACT_FORM} = process.env;

const SidebarMenu = () => {
  const {t} = useTranslation();

  return (
    <ul className="nav flex-column">
      <SidebarListItem name={t('sidebar.map')} link={paths.HOME} />
      <SidebarListItem name={t('sidebar.profile')} link={paths.PROFILE} />
      <SidebarListItem name={t('sidebar.history')} link={paths.HOME} />
      <SidebarListItem externalLink name={t('sidebar.contact')} link={REACT_APP_CONTACT_FORM} />
      <SidebarListItem name={t('sidebar.managementDashbord')} link={paths.MANAGEMENT_PANEL} />
    </ul>
  );
};

export default SidebarMenu;
