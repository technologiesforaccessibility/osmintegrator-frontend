import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import './login.scss';
import colors from './colors.module.scss';

import {postDefaultHeaders} from '../config/apiConfig';
import {formError400Text} from "./utilities-texts";

const {REACT_APP_LOGIN_PATH} = process.env;

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loginEmail: '',
            loginPassword: '',
            isMessageShown: false,
            message: ''
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

    submit(e) {
        e.preventDefault();
        const url = REACT_APP_LOGIN_PATH;
        axios.post(url,
            {
                "Email": this.state.loginEmail,
                "Password": this.state.loginPassword
            },
            {
                headers: postDefaultHeaders()
            })
            .then(resp => {
                if (resp.status === 200) {
                    console.log("Authentication success");
                    localStorage.setItem('token', resp.data.token);
                    localStorage.setItem('tokenRefresh', resp.data.refreshToken);
                }
            })
            .catch( (error) => {
                if (error.response.status === 401) {
                    this.showMessage(error.response.data.message)
                } else if (error.response.status === 400) {
                    this.showMessage(formError400Text())
                } else {
                    console.warn("Undefined authentication problem")
                }
            });
    }

    render() {
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