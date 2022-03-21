import { FC, ReactNode } from 'react';
import dots from './../assets/authDots.png';

import './../stylesheets/dashboardSidebar.scss';

type TSidebarContainerProps = {
  navigation: JSX.Element;
  children: ReactNode;
};

const SidebarContainer: FC<TSidebarContainerProps> = ({ navigation, children }) => (
  <div className="sidebar">
    <img src={dots} className="sidebar__image" alt="BackgroundDots"></img>
    <div className="sidebar__navigation">{navigation}</div>
    <div className="sidebar__details">{children}</div>
  </div>
);

export default SidebarContainer;