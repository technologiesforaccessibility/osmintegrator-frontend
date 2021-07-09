import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux'

import {selectAuthIsLoggedIn} from '../redux/selectors/authSelector';

export default function PrivateRoute({ component: Component, ...rest }) {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const routeComponent = isLoggedIn ? Component : () => <Redirect to='/auth/login'/>;

  return <Route {...rest} component={routeComponent} />
}
