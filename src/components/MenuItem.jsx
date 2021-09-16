import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import {hasAccessToPath} from '../utilities/auth';
import './../stylesheets/menuItem.scss';

const {REACT_APP_CONTACT_FORM} = process.env;

const MenuItem = ({link, name, externalLink}) => {
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

MenuItem.propTypes = {
  link: PropTypes.string,
  name: PropTypes.string,
  externalLink: PropTypes.bool,
};

MenuItem.defaultProps = {
  externalLink: false,
};
