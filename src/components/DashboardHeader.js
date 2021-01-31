import React, {Component} from 'react';

const {REACT_APP_LOGIN_PATH, REACT_APP_LOGOUT_PATH} = process.env;

class DashboardHeader extends Component {
        constructor(props) {
        super(props);
    }

    proceedLogOut = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('tokenRefresh');
    }

    render() {
        return (
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                    <a href={window.location.href} className="navbar-brand col-md-3 col-lg-2 me-0 px-3">Osm Integrator</a>
                    <button className="navbar-toggler position-absolute d-md-none collapsed" type="button"
                            data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <input className="form-control form-control-dark w-100" type="text" placeholder="Search"
                           aria-label="Search"/>
                    <ul className="navbar-nav px-3">
                        <li className="nav-item text-nowrap">
                            {this.props.isLoggedIn ? <a className="nav-link" href={REACT_APP_LOGOUT_PATH} onClick={this.proceedLogOut()} >Sign out</a> : <a className="nav-link" href={REACT_APP_LOGIN_PATH} >Log in</a>}
                        </li>
                    </ul>
                </header>
        );
    }
}

export default DashboardHeader;