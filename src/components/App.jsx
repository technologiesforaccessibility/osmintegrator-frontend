import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux'

import PrivateRoute from './PrivateRoute';
import ManagementPanel from './ManagementPanel';
import DashboardMain from './DashboardMain';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import ProfilePanel from './ProfilePanel';
import Auth from './Auth';
import MapContextProvider from './contexts/MapContextProvider';
import UserContextProvider from './contexts/UserContextProvider';
import store from '../redux/store';

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
                <Route path={['/auth', '/Account']} component={Auth} />
                <PrivateRoute path='/manage' exact component={ManagementPanel} />
                <PrivateRoute path="/profile/change-email" exact component={ChangeEmail} />
                <PrivateRoute path="/profile/change-password" exact component={ChangePassword} />
                <PrivateRoute path="/profile" exact component={ProfilePanel} />
                <PrivateRoute path='/' exact component={DashboardMain} />
              </MapContextProvider>
            </UserContextProvider>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
