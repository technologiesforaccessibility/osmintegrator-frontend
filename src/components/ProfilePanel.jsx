import React from 'react';
import {NavLink} from 'react-router-dom';

const ProfilePanel = () => {
  const linkList = [
    {link: '/profile/change-email', title: 'Change e-mail'},
    {link: '/profile/change-password', title: 'Change password'},
    {link: '#', title: 'About you'},
  ];
  return (
    <ul>
      {linkList.map(({link, title}, index) => (
        <li key={index}>
          <NavLink to={link}>{title}</NavLink>
        </li>
      ))}
    </ul>
  );
};

export default ProfilePanel;
