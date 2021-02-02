import React, {Component} from 'react';
import PropertyGrid from './PropertyGrid';

class DashboardSiderbar extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                            <div className="full-height position-sticky pt-3">

                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="/">
                                            <span data-feather="home"></span>
                                            Map
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/">
                                            <span data-feather="file"></span>
                                            Settings
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/">
                                            <span data-feather="users"></span>
                                            History
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/">
                                            <span data-feather="layers"></span>
                                            Contact
                                        </a>
                                    </li>
                                </ul>


                                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                    <span>Last used tiles</span>
                                    <a className="link-secondary" href="/" aria-label="Add a new report">
                                        <span data-feather="plus-circle"></span>
                                    </a>
                                </h6>
                                <ul className="nav flex-column mb-2">
                                    <li className="nav-item">
                                        <a className="nav-link" href="/">
                                            <span data-feather="file-text"></span>
                                            Tile 1
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/">
                                            <span data-feather="file-text"></span>
                                            Tile 2
                                        </a>
                                    </li>
                                </ul>

                                {this.props.isLoggedIn ? <PropertyGrid/> : null}

                            </div>
                        </nav>
        );
    }
}

export default DashboardSiderbar;