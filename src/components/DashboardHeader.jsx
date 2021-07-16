import {Link} from 'react-router-dom';

import React from 'react';
import {paths} from '../utilities/constants';

const DashboardHeader = ({isLoggedIn}) => {
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a href={window.location.href} className="navbar-brand col-md-3 col-lg-2 me-0 px-3">
        Osm Integrator
      </a>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          {isLoggedIn ? (
            <Link className="nav-link" to={paths.LOGOUT}>
              Sign out
            </Link>
          ) : (
            <Link className="nav-link" to={paths.LOGIN}>
              Log in
            </Link>
          )}
        </li>
      </ul>
    </header>
  );
};

export default DashboardHeader;
