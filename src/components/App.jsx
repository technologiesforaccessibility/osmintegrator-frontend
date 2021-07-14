import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import PrivateRoute from './PrivateRoute';
import Dashboard from './Dashboard';
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
                <PrivateRoute path={['/profile', '/manage']} component={Dashboard} />
                <PrivateRoute exact path="/" component={Dashboard} />
              </MapContextProvider>
            </UserContextProvider>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
