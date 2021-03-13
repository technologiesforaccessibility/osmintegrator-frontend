import React, {Component} from 'react';
import {NavLink, Redirect} from 'react-router-dom';

import './login.scss';
import colors from './colors.module.scss';

import {postDefaultHeaders} from '../config/apiConfig';
import {formError400Text} from "./utilities-texts";
import client from "../api/apiInstance";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loginEmail: '',
            loginPassword: '',
            isMessageShown: false,
            message: '',
            shouldRedirect: false
        };

        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
    }

    change(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    showMessage = (msg) => {
        this.setState({
            isMessageShown: true,
            message: msg
        })
    }

    hideMessage = () => {
        if (this.state.isMessageShown) {
            this.setState({
                isMessageShown: false,
                message: ''
            })
        }
    }

    async submit(e) {
        e.preventDefault();

        try {
            const response = await client.api.accountLoginCreate({
                    email: this.state.loginEmail,
                    password: this.state.loginPassword
                },
                {headers: postDefaultHeaders()});
            if (response.status === 200) {
                console.log("Authentication success");
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('tokenRefresh', response.data.refreshToken);
                this.setState({shouldRedirect: true});
            } else {
                console.log("Authentication problem")
            }
        } catch (error) {
            if (error.status === 401) {
                this.showMessage(error.error.message)
            } else if (error.status === 400) {
                this.showMessage(formError400Text())
            } else {
                console.warn("Undefined authentication problem")
            }
        }
    }

    render() {
        if (this.state.shouldRedirect) {
            return <Redirect to="/"/>
        }
        return (
            <React.Fragment>
                <h1 className="auth-title">Welcome</h1>
                <form name="login-form" onSubmit={e => this.submit(e)}>
                    <div className="inputbox-spacer">
                        <input type="text" id="loginEmail" placeholder="E-mail"
                               onChange={e => {
                                   this.change(e)
                               }} onClick={this.hideMessage}/>
                    </div>
                    <div className="inputbox-spacer">
                        <input type="password" id="loginPassword" placeholder="Password"
                               onChange={e => {
                                   this.change(e)
                               }} onClick={this.hideMessage}/>
                    </div>
                    <div className="login-button-area">
                        <button type="submit" id="button-login">Log in</button>
                    </div>
                </form>
                <div className="link"><NavLink to="/auth/recover">Forgot Username / Password ?</NavLink></div>
                <div className="auth-info-placeholder centered" value="">{this.state.isMessageShown &&
                <span style={{color: colors['colorMessageFail']}}>{this.state.message}</span>}</div>
            </React.Fragment>
        );
    }
}

export default Login;