import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import PrivateRoute from './PrivateRoute';
import ManagementPanel from './ManagementPanel';
import DashboardMain from './DashboardMain';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import ProfilePanel from './ProfilePanel';
import Login from './auth/Login';
import Recover from './auth/Recover';
import Logout from './auth/Logout';
import SetPassword from './auth/SetPassword';
import MapContextProvider from './contexts/MapContextProvider';
import UserContextProvider from './contexts/UserContextProvider';
import store from '../redux/store';
import {paths} from '../utilities/constants';

import '../stylesheets/app.scss';
import '../stylesheets/globalStyles.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <UserContextProvider>
              <MapContextProvider>
                <Route path={paths.LOGIN} component={Login} />
                <Route path={paths.RECOVER_PASSWORD} component={Recover} />
                <PrivateRoute path={paths.LOGOUT} component={Logout} />
                <Route path={paths.RESET_PASSWORD} component={SetPassword} />
                <PrivateRoute path={paths.MANAGEMENT_PANEL} exact component={ManagementPanel} />
                <PrivateRoute path={paths.CHANGE_EMAIL} exact component={ChangeEmail} />
                <PrivateRoute path={paths.CHANGE_PASSWORD} exact component={ChangePassword} />
                <PrivateRoute path={paths.PROFILE} exact component={ProfilePanel} />
                <PrivateRoute path={paths.HOME} exact component={DashboardMain} />
              </MapContextProvider>
            </UserContextProvider>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
