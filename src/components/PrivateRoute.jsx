import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {paths} from '../utilities/constants';

import {selectAuthIsLoggedIn} from '../redux/selectors/authSelector';
import {hasAccessToPath} from '../utilities/auth';

export default function PrivateRoute({component: Component, path, ...rest}) {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  function getComponent() {
    if (!isLoggedIn) {
      return () => <Redirect to={paths.LOGIN} />;
    }

    if (hasAccessToPath(path)) {
      return Component;
    }

    return () => <Redirect to={paths.PROFILE} />;
  }

  const routeComponent = getComponent();

  return <Route {...rest} path={path} component={routeComponent} />;
}
