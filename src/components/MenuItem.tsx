import './../stylesheets/menuItem.scss';

import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { hasAccessToPath } from '../utilities/auth';

const { REACT_APP_CONTACT_FORM } = process.env;

type TMenuItemProps = {
  link: string;
  name: string;
  externalLink?: boolean;
};

const MenuItem: FC<TMenuItemProps> = ({ link, name, externalLink = false }) => {
  if (!hasAccessToPath(link)) {
    return <></>;
  }

  return (
    <div className="menu-item">
      {externalLink ? (
        <a target="_blank" rel="noopener noreferrer" href={REACT_APP_CONTACT_FORM}>
          {name}
        </a>
      ) : (
        <NavLink to={link}>{name}</NavLink>
      )}
    </div>
  );
};

export default MenuItem;
