import React, {Fragment} from 'react';

import SidebarListItem from './SidebarListItem';

const RecentlySeenTileList = () => {
  return (
    <Fragment>
      <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>Last used tiles</span>
        <a className="link-secondary" href="/" aria-label="Add a new report">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul className="nav flex-column mb-2">
        <SidebarListItem name="Tile 1" dataFeather="file-text" link="/" />
        <SidebarListItem name="Tile 2" dataFeather="file-text" link="/" />
      </ul>
    </Fragment>
  );
};

export default RecentlySeenTileList;
