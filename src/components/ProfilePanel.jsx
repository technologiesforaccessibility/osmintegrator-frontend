import React from 'react';
import {NavLink} from 'react-router-dom';

import ProfileLayout from './ProfileLayout';
import {paths} from '../utilities/constants';

const ProfilePanel = () => {
  const linkList = [
    {link: paths.CHANGE_EMAIL, title: 'Change e-mail'},
    {link: paths.CHANGE_PASSWORD, title: 'Change password'},
  ];
  return (
    <ProfileLayout>
      <ul>
        {linkList.map(({link, title}, index) => (
          <li key={index}>
            <NavLink to={link}>{title}</NavLink>
          </li>
        ))}
      </ul>
    </ProfileLayout>
  );
};

export default ProfilePanel;
