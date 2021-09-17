import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import store from '../redux/store';
import '../stylesheets/app.scss';
import '../stylesheets/globalStyles.scss';
import {paths} from '../utilities/constants';
import Login from './auth/Login';
import Register from './auth/Register';
import Logout from './auth/Logout';
import Recover from './auth/Recover';
import SetPassword from './auth/SetPassword';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import MapContextProvider from './contexts/MapContextProvider';
import UserContextProvider from './contexts/UserContextProvider';
import DashboardMain from './DashboardMain';
import ManagementPanel from './managementPanel/ManagementPanel';
import Notification from './Notification';
import PrivateRoute from './PrivateRoute';
import ProfilePanel from './ProfilePanel';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Notification />
        <BrowserRouter>
          <Switch>
            <UserContextProvider>
              <MapContextProvider>
                <Route path={paths.LOGIN} component={Login} />
                <Route path={paths.REGISTER} component={Register} />
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
