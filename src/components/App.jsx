import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Dashboard from './Dashboard';
import Auth from './Auth';
import MapContextProvider from './contexts/MapContextProvider';
import UserContextProvider from './contexts/UserContextProvider';

import '../stylesheets/app.scss';

import '../stylesheets/globalStyles.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <UserContextProvider>
            <MapContextProvider>
              <Route path={['/auth', '/Account']} component={Auth} />
              <Route path={['/profile', '/manage', '/']} component={Dashboard} />
            </MapContextProvider>
          </UserContextProvider>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
