import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux'
import {paths} from '../utilities/constants';

import {selectAuthIsLoggedIn, selectLoggedInUserRoles} from '../redux/selectors/authSelector';

const PROTECTED_ROUTES = [
  {
    path: paths.MANAGEMENT_PANEL,
    allowedRoles: ['Admin']
  }
]

export default function PrivateRoute({ component: Component, path, ...rest }) {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const userRoles = useSelector(selectLoggedInUserRoles) || [];

  function getComponent() {
    if (!isLoggedIn) {
      return () => <Redirect to={paths.LOGIN} />;
    }

    const protectedRoute = PROTECTED_ROUTES.find((route) => {
      if (Array.isArray(path)) {
        return path.includes(route.path);
      }

      return route.path === path;
    });

    if (protectedRoute) {
      const isUserRoleAllowed = protectedRoute.allowedRoles.some((role) => userRoles.includes(role));

      if (!isUserRoleAllowed) {
        return () => <Redirect to={paths.HOME} />
      }
    }

    return Component;
  }

  const routeComponent = getComponent();

  return <Route {...rest} path={path} component={routeComponent} />
}
