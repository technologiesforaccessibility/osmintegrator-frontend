import React from 'react';
import {useTranslation} from 'react-i18next';

import SidebarListItem from './SidebarListItem';

const {REACT_APP_CONTACT_FORM} = process.env;

const SidebarMenu = () => {
    const {t} = useTranslation();

    return (
        <ul className="nav flex-column">
            <SidebarListItem name="Map" link="/" />
            <SidebarListItem
                name="Profile"
                link="/profile"
            />
            <SidebarListItem name="History"  link="/" />
            <SidebarListItem externalLink name={t('sidebar.contact')}  link={REACT_APP_CONTACT_FORM} />
            <SidebarListItem
                name="Management dashboard"
                dataFeather="layers"
                link="/manage"
            />
        </ul>
    );
};

export default SidebarMenu;
