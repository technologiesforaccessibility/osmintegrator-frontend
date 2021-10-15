import React from 'react';
import {NavLink} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import ProfileLayout from './ProfileLayout';
import {paths} from '../utilities/constants';

const {REACT_APP_MVP_DISABLED} = process.env;

const ProfilePanel = () => {
  const linkList = [
    {link: paths.CHANGE_EMAIL, title: 'Change e-mail'},
    {link: paths.CHANGE_PASSWORD, title: 'Change password'},
  ];

  const {t} = useTranslation();

  return (
    <ProfileLayout>
      {REACT_APP_MVP_DISABLED ? (
        <p>{t('profile.MVPPlaceholder')}</p>
      ) : (
        <ul>
          {linkList.map(({link, title}, index) => (
            <li key={index}>
              <NavLink to={link}>{title}</NavLink>
            </li>
          ))}
        </ul>
      )}
    </ProfileLayout>
  );
};

export default ProfilePanel;
