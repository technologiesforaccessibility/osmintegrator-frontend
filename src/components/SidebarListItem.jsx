import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import {hasAccess} from '../utilities/auth';

const {REACT_APP_CONTACT_FORM} = process.env;

const SidebarListItem = ({link, name, externalLink}) => {
  if (!hasAccess(link)) {
    return <></>
  }

  return (
    <li className="nav-item nav-link active">
      {externalLink ? (
        <a target="_blank" rel="noopener noreferrer" href={REACT_APP_CONTACT_FORM}>
          {name}
        </a>
      ) : (
        <NavLink to={link}>{name}</NavLink>
      )}
    </li>
  );
};

export default SidebarListItem;

SidebarListItem.propTypes = {
  link: PropTypes.string,
  name: PropTypes.string,
  externalLink: PropTypes.bool,
};

SidebarListItem.defaultProps = {
  externalLink: false,
};
