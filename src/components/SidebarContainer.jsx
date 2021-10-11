import PropTypes, {string, elementType, node, bool, arrayOf} from 'prop-types';
import dots from './../assets/authDots.png';

import './../stylesheets/dashboardSidebar.scss';

const SidebarContainer = ({navigation, children, finishTileButton, isTileActive, userRoles, appRoles}) => {
  return (
    <div className="sidebar">
      <img src={dots} className="sidebar__image" alt="BackgroundDots"></img>
      <div className="sidebar__navigation">{navigation}</div>
      <div className="sidebar__details">{children}</div>
      <div className="sidebar__approve">
        {isTileActive && userRoles.some(role => [appRoles.SUPERVISOR, appRoles.EDITOR].includes(role)) && (
          <div className="sidebar__finish-tile">{finishTileButton}</div>
        )}
      </div>
    </div>
  );
};

PropTypes.SidebarContainer = {
  navigation: elementType.isRequired,
  children: node.isRequired,
  finishTileButton: elementType.isRequired,
  isTileActive: bool.isRequired,
  userRoles: arrayOf(string).isRequired,
  appRoles: arrayOf(string).isRequired,
};

export default SidebarContainer;
