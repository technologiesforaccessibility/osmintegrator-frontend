import React from 'react';
import Dashboard from './Dashboard';
import '../stylesheets/profileLayout.scss';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {selectLoggedInUserRoles, selectUserName} from '../redux/selectors/authSelector';

export default function ProfileLayout({children}) {
  const {t} = useTranslation();
  const authRoles = useSelector(selectLoggedInUserRoles);
  const name = useSelector(selectUserName);

  return (
    <Dashboard>
      <div className="profile-layout">
        <div className="profile-layout__wrapper">
          <div className="profile-layout__title">{t('profile.header')}</div>

          <div className="profile-layout__data">
            <div className="profile-layout__data-el">
              <h4 className="profile-layout__heading">{t('profile.userName')}</h4>
              <p className="profile-layout__text">{name ? name : '-'}</p>
            </div>
            <div className="profile-layout__data-el">
              <h4 className="profile-layout__heading">{t('profile.roles')}</h4>
              <p className="profile-layout__text">{[authRoles].join(', ')}</p>
            </div>
          </div>

          <div>{children}</div>
        </div>
      </div>
    </Dashboard>
  );
}
