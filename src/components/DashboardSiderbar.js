import React, {Component} from 'react';
import PropertyGrid from './PropertyGrid';
import {NavLink} from "react-router-dom";
import SidebarListItem from "./SidebarListItem";

class DashboardSiderbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="full-height position-sticky pt-3">

                    <ul className="nav flex-column">
                        <SidebarListItem name = "Map" dataFeather="Home" link="/"/>
                        <SidebarListItem name = "Profile" dataFeather="file" link="/profile" />
                        <SidebarListItem name = "History" dataFeather="users" link="/" />
                        <SidebarListItem name = "Contact" dataFeather="layers" link="/" />
                        <SidebarListItem name = "Management dashboard" dataFeather="layers" link="/manage" />
                    </ul>


                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Last used tiles</span>
                        <a className="link-secondary" href="/" aria-label="Add a new report">
                            <span data-feather="plus-circle"></span>
                        </a>
                    </h6>
                    <ul className="nav flex-column mb-2">
                        <SidebarListItem name = "Tile 1" dataFeather="file-text" link="/"/>
                        <SidebarListItem name = "Tile 2" dataFeather="file-text" link="/"/>
                    </ul>

                    <div className="form-check" style={{paddingBottom: "1.25rem"}}>
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                               onClick={e => {
                                   this.props.connectBusStops(e.target.checked)
                               }}
                        >
                        </input>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Connect bus stops
                        </label>

                    </div>
                    {this.props.propertyGrid
                        ? <PropertyGrid propertyGrid={this.props.propertyGrid}
                                        updatePropertyGrid={this.props.updatePropertyGrid}
                        /> : null}
                </div>
            </nav>
        );
    }
}

export default DashboardSiderbar;