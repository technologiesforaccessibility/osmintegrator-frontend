import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

import './login.scss';
import colors from './colors.module.scss';

import {postDefaultHeaders} from '../config/apiConfig';

const {REACT_APP_LOGIN_PATH} = process.env;

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
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
            [e.target.name]: e.target.value
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
                "UserName": this.state.email,
                "Password": this.state.password
            },
            {
                headers: postDefaultHeaders()
            })
            .then(resp => {
                if (!resp.data.isSuccess) {
                    this.showMessage(resp.data.errorMsg);
                } else {
                    console.log("resp.data.isSuccess: ", resp.data.isSuccess);
                    localStorage.setItem('token', resp.data.tokenData.token);
                    localStorage.setItem('tokenRefresh', resp.data.tokenData.refreshToken);
                }
            })
            .catch(error => {
                console.log(error.resp);
            });
    }

    render() {
        return (
            <React.Fragment>
                <div className="auth-area">
                    <div className="form-div">
                        <h1 id="title-login">Welcome</h1>
                        <form name="login-form" onSubmit={e => this.submit(e)}>
                            <div className="field-area">
                                <input type="text" name="email" id="email-input" placeholder="E-mail"
                                       onChange={e => {
                                           this.change(e)
                                       }} onClick={this.hideMessage}/>
                            </div>
                            <div className="field-area">
                                <input type="password" name="password" id="password-input" placeholder="Password"
                                       onChange={e => {
                                           this.change(e)
                                       }} onClick={this.hideMessage}/>
                            </div>
                            <div className="login-button-area">
                                <button type="submit" id="button-login">Log in</button>
                            </div>
                        </form>
                        <div className="link"><NavLink to="/auth/recover">Forgot Username / Password ?</NavLink></div>
                        <div className="auth-info-placeholder" value="">{this.state.isMessageShown &&
                        <span style={{color: colors['colorMessageFail']}}>{this.state.message}</span>}</div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;