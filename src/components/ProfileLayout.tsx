import '../stylesheets/profileLayout.scss';

import Button from '@mui/material/Button';
import React, { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectLoggedInUserRoles, selectUserName } from '../redux/selectors/authSelector';
import Dashboard from './DashboardWrapper';

const { REACT_APP_USER_MANUAL } = process.env;

type TProfileLayoutProps = {
  children: ReactNode;
};

const ProfileLayout: FC<TProfileLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
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
              <p className="profile-layout__text">
                {authRoles ? [authRoles].join(', ') : <b>{t('profile.noRoles')}</b>}
              </p>
            </div>
          </div>

          <div>{children}</div>

          <Button variant="contained" href={REACT_APP_USER_MANUAL}>
            {t('footer.userManual')}
          </Button>
        </div>
      </div>
    </Dashboard>
  );
};

export default ProfileLayout;
