import React, {Component} from 'react';
import axios from 'axios';

import './setPassword.scss';
import colors from './colors.module.scss';

import {comparePasswords, isPasswordStrong, getEmailFromPath, getTokenFromPath} from "./utilities";
import {changedPasswordText, expiredTokenText, invalidPasswordsText} from "./utilities-texts";
import {postDefaultHeaders} from '../config/apiConfig';

const {REACT_APP_SET_PASS_PATH} = process.env;

class SetPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isMessageShown: '',
            message: '',
            messageColor: ''
        };

        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
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

    setMessageColor = (color) => {
        this.setState({messageColor: color})
    }

    submit(e) {
        e.preventDefault();
        if (comparePasswords(this.state.password1, this.state.password2) && isPasswordStrong(this.state.password1)) {
            const url = REACT_APP_SET_PASS_PATH;
            axios.post(url,
                {
                    "Email": getEmailFromPath(window.location.href),
                    "Password": this.state.password1,
                    "ConfirmPassword": this.state.password2,
                    "Token": getTokenFromPath(window.location.href)
                },
                {
                    headers: postDefaultHeaders()
                })
                .then(resp => {
                    console.log(resp);
                    if (resp.data.isSuccess) {
                        this.setMessageColor(colors['colorMessageSuccess'])
                        this.showMessage(changedPasswordText());
                    } else {
                        this.setMessageColor(colors['colorMessageFail'])
                        this.showMessage(expiredTokenText());
                    }
                })
                .catch(error => {
                    console.log(error.resp);
                });
        } else {
            this.setMessageColor(colors['colorMessageFail'])
            this.showMessage(invalidPasswordsText());
        }

    }

    render() {
        return (
            <React.Fragment>
                <div className="auth-area">
                    <div className="form-div">
                        <h1 id="title-login">Set a new password</h1>
                        <h3 className="subtitle">{getEmailFromPath(window.location.href)}</h3>
                        <form name="recover-form" onSubmit={e => this.submit(e)}>
                            <div className="field-area">
                                <input type="password" name="password1" id="email-input" placeholder="New password"
                                       onChange={e => {
                                           this.change(e)
                                       }} onClick={this.hideMessage}/>
                            </div>
                            <div className="field-area">
                                <input type="password" name="password2" id="email-input" placeholder="Confirm password"
                                       onChange={e => {
                                           this.change(e)
                                       }} onClick={this.hideMessage}/>
                            </div>
                            <div className="login-button-area">
                                <button type="submit" id="button-login">Set new password</button>
                            </div>
                        </form>
                        <div className="centered auth-info-placeholder" value="">{this.state.isMessageShown &&
                        <span style={{color: this.state.messageColor}}>{this.state.message}</span>}</div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SetPassword;