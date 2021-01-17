import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './Login';
import Recover from './Recover';
import SetPassword from './SetPassword';

class Auth extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path="/auth/login" component={Login}/>
                    <Route path="/auth/recover" component={Recover}/>
                    <Route path="/auth/reset" component={SetPassword}/>
                </Switch>
            </React.Fragment>
        )
    }
}

export default Auth;