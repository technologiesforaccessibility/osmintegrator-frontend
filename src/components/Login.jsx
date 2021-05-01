import React, {Component} from 'react';
import {NavLink, Redirect} from 'react-router-dom';

import {noTokenHeaders} from '../config/apiConfig';
import {unsafeLoginApiError} from '../utilities/utilities';
import client from '../api/apiInstance';

import '../stylesheets/login.scss';
import colors from '../stylesheets/colors.module.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginEmail: '',
            loginPassword: '',
            message: null,
            shouldRedirect: false,
        };
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    change(e) {
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    showMessage = msg => {
        this.setState({
            message: msg,
        });
    };

    hideMessage = () => {
        if (this.state.message) {
            this.setState({
                message: null,
            });
        }
    };

    async submit(e) {
        e.preventDefault();

        try {
            const response = await client.api.accountLoginCreate(
                {
                    email: this.state.loginEmail,
                    password: this.state.loginPassword,
                },
                {headers: noTokenHeaders()},
            );
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('tokenRefresh', response.data.refreshToken);
            this.setState({shouldRedirect: true});
        } catch (error) {
            this.showMessage(unsafeLoginApiError(error));
        }
    }

    render() {
        if (this.state.shouldRedirect) {
            return <Redirect to="/" />;
        }
        return (
            <React.Fragment>
                <h1 className="auth-title">Welcome</h1>
                <form name="login-form" onSubmit={e => this.submit(e)}>
                    <div className="inputbox-spacer">
                        <input
                            type="text"
                            id="loginEmail"
                            placeholder="E-mail"
                            onChange={e => {
                                this.change(e);
                            }}
                            onClick={this.hideMessage}
                        />
                    </div>
                    <div className="inputbox-spacer">
                        <input
                            type="password"
                            id="loginPassword"
                            placeholder="Password"
                            onChange={e => {
                                this.change(e);
                            }}
                            onClick={this.hideMessage}
                        />
                    </div>
                    <div className="login-button-area">
                        <button type="submit" id="button-login">
                            Log in
                        </button>
                    </div>
                </form>
                <div className="link">
                    <NavLink to="/auth/recover">
                        Forgot Username / Password ?
                    </NavLink>
                </div>
                <div className="auth-info-placeholder centered" value="">
                    {this.state.message && (
                        <span style={{color: colors['colorMessageFail']}}>
                            {this.state.message}
                        </span>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default Login;
