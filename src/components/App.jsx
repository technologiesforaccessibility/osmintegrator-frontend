import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard';
import Auth from './Auth';
import '../stylesheets/app.scss';

class App extends Component {


  render() {
    return (

      <BrowserRouter>
        <Switch>
          <Route path={["/auth", "/Account"]} component={Auth} />
          <Route path={["/profile", "/"]} component={Dashboard} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
