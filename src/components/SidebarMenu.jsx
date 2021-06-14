import React from 'react';
import SidebarListItem from './SidebarListItem';

const SidebarMenu = () => {
  return (
    <ul className="nav flex-column">
      <SidebarListItem name="Map" dataFeather="Home" link="/" />
      <SidebarListItem name="Profile" dataFeather="file" link="/profile" />
      <SidebarListItem name="History" dataFeather="users" link="/" />
      <SidebarListItem name="Contact" dataFeather="layers" link="/" />
      <SidebarListItem name="Management dashboard" dataFeather="layers" link="/manage" />
    </ul>
  );
};

export default SidebarMenu;
