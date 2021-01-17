import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MapView from './MapView';
import Auth from './Auth';

// import variables from '../variables.module.scss';
// import colors from './colors.module.scss';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(variables);
    // console.log(colors);
    return (

      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={MapView} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;