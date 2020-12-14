import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import MapView from './MapView';
import Login from './Login';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/Login" component={Login} />
          <Route path="/" exact component={MapView} />
        </Switch>
      </BrowserRouter>     
    );
  }
}

export default App;