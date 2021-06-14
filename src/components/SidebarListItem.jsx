import React from 'react';
import {NavLink} from 'react-router-dom';

const SidebarListItem = ({link, dataFeather, name}) => {
  return (
    <li className="nav-item nav-link active">
      <NavLink to={link}>
        <span data-feather={dataFeather} />
        {name}
      </NavLink>
    </li>
  );
};

export default SidebarListItem;
