import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import store from '../redux/store';
import {CookiesProvider} from 'react-cookie';
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
import ConversationContextProvider from './contexts/ConversationProvider';
import DashboardMain from './DashboardMain';
import ManagementPanel from './managementPanel/ManagementPanel';
import Notification from './Notification';
import PrivateRoute from './PrivateRoute';
import ProfilePanel from './ProfilePanel';
import RegisterConfirm from './auth/RegisterConfirm';
import RegisterActivated from './auth/RegisterActivated';
import CookiesBar from './CookiesBar';
import RecoverConfirm from './auth/RecoverConfirm';
import ResetConfirm from './auth/ResetConfirm';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CookiesProvider>
          <Notification />
          <CookiesBar />
          <BrowserRouter>
            <Switch>
              <UserContextProvider>
                <MapContextProvider>
                  <ConversationContextProvider>
                    <Route path={paths.LOGIN} component={Login} />
                    <Route path={paths.REGISTER} component={Register} />
                    <Route path={paths.REGISTER_CONFIRM} component={RegisterConfirm} />
                    <Route path={paths.REGISTER_ACTIVATED} component={RegisterActivated} />
                    <Route path={paths.RECOVER_PASSWORD} component={Recover} />
                    <Route path={paths.RECOVER_CONFIRM} component={RecoverConfirm} />
                    <Route path={paths.LOGOUT} component={Logout} />
                    <Route path={paths.RESET_PASSWORD} component={SetPassword} />
                    <Route path={paths.CHANGE_PASSWORD_CONFIRM} component={ResetConfirm} />
                    <PrivateRoute path={paths.MANAGEMENT_PANEL} exact component={ManagementPanel} />
                    <PrivateRoute path={paths.CHANGE_EMAIL} exact component={ChangeEmail} />
                    <PrivateRoute path={paths.CHANGE_PASSWORD} exact component={ChangePassword} />
                    <PrivateRoute path={paths.PROFILE} exact component={ProfilePanel} />
                    <PrivateRoute path={paths.HOME} exact component={DashboardMain} />
                  </ConversationContextProvider>
                </MapContextProvider>
              </UserContextProvider>
            </Switch>
          </BrowserRouter>
        </CookiesProvider>
      </Provider>
    );
  }
}

export default App;
