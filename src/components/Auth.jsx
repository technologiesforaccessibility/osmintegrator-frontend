import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './auth/Login';
import Recover from './auth/Recover';
import Logout from './auth/Logout';
import SetPassword from './auth/SetPassword';
import '../stylesheets/auth.scss';

class Auth extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="auth-area">
          <div className="form-div">
            <Switch>
              <Route path="/auth/login" component={Login} />
              <Route path="/auth/recover" component={Recover} />
              <Route path="/auth/logout" component={Logout} />
              <Route path="/Account/ResetPassword" component={SetPassword} />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Auth;
