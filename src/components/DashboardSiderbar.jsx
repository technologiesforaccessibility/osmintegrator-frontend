import React, {Component, useContext} from 'react';
import PropertyGrid from './PropertyGrid';
import SidebarListItem from './SidebarListItem';
import MapPanel from './MapPanel';
import {MapContext} from "./contexts/MapContextProvider";

const DashboardSiderbar = props => {

    const {
            propertyGrid
        } = useContext(MapContext);

    return (
        <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="full-height position-sticky pt-3">
                <ul className="nav flex-column">
                    <SidebarListItem name="Map" dataFeather="Home" link="/" />
                    <SidebarListItem
                        name="Profile"
                        dataFeather="file"
                        link="/profile"
                    />
                    <SidebarListItem
                        name="History"
                        dataFeather="users"
                        link="/"
                    />
                    <SidebarListItem
                        name="Contact"
                        dataFeather="layers"
                        link="/"
                    />
                    <SidebarListItem
                        name="Management dashboard"
                        dataFeather="layers"
                        link="/manage"
                    />
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Last used tiles</span>
                    <a
                        className="link-secondary"
                        href="/"
                        aria-label="Add a new report">
                        <span data-feather="plus-circle"></span>
                    </a>
                </h6>
                <ul className="nav flex-column mb-2">
                    <SidebarListItem
                        name="Tile 1"
                        dataFeather="file-text"
                        link="/"
                    />
                    <SidebarListItem
                        name="Tile 2"
                        dataFeather="file-text"
                        link="/"
                    />
                </ul>

                <MapPanel />
                {propertyGrid && (
                    <PropertyGrid
                        propertyGrid={propertyGrid}
                        updatePropertyGrid={props.updatePropertyGrid}
                    />
                )}
            </div>
        </nav>
    );
};

export default DashboardSiderbar;
