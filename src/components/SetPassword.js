import React, {Component} from 'react';

import './setPassword.scss';
import colors from './colors.module.scss';

import {comparePasswords, isPasswordStrong, getEmailFromPath, getTokenFromPath} from "./utilities";
import {changedPasswordText, expiredTokenText, invalidPasswordsText} from "./utilities-texts";
import {postDefaultHeaders} from '../config/apiConfig';
import {Redirect} from "react-router-dom";

import client from "../api/apiInstance";

class SetPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isMessageShown: '',
            message: '',
            messageColor: '',
            shouldRedirect: false
        };

        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
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

    setMessageColor = (color) => {
        this.setState({messageColor: color})
    }

    async submit(e) {
        e.preventDefault();

        if (comparePasswords(this.state.password1Reset, this.state.password2Reset)
            && isPasswordStrong(this.state.password1Reset)) {
            try {
                const response = await client.api.accountResetPasswordCreate({
                    email: getEmailFromPath(window.location.href),
                    password: this.state.password1Reset,
                    token: getTokenFromPath(window.location.href)
                }, {
                    headers: postDefaultHeaders()
                })
                if (response.status === 200) {
                    this.setMessageColor(colors['colorMessageSuccess'])
                    this.showMessage(changedPasswordText());
                    setTimeout(() => this.setState({shouldRedirect: true}), 5000);
                }
            } catch (error) {
                if (error.status === 400) {
                    this.setMessageColor(colors['colorMessageFail'])
                    this.showMessage(expiredTokenText());
                } else {
                    console.warn("Undefined error")
                }
            }
        }
    }

    render() {
        if (this.state.shouldRedirect) {
            return <Redirect to="/auth/login"/>
        }
        return (
            <React.Fragment>
                <h1 className="auth-title">Set a new password</h1>
                <h3 className="subtitle">{getEmailFromPath(window.location.href)}</h3>
                <form name="recover-form" onSubmit={e => this.submit(e)}>
                    <div className="inputbox-spacer">
                        <input type="password" id="password1Reset" placeholder="New password"
                               onChange={e => {
                                   this.change(e)
                               }} onClick={this.hideMessage}/>
                    </div>
                    <div className="inputbox-spacer">
                        <input type="password" id="password2Reset" placeholder="Confirm password"
                               onChange={e => {
                                   this.change(e)
                               }} onClick={this.hideMessage}/>
                    </div>
                    <div className="setPassword-button-area">
                        <button type="submit" id="button-set-password">Set new password</button>
                    </div>
                </form>
                <div className="centered auth-info-placeholder" value="">{this.state.isMessageShown &&
                <span style={{color: this.state.messageColor}}>{this.state.message}</span>}</div>
            </React.Fragment>
        );
    }
}

export default SetPassword;