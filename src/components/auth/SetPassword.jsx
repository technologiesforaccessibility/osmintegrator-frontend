import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import {
    comparePasswords,
    isPasswordStrong,
    getEmailFromPath,
    getTokenFromPath,
    unsafeLoginApiError,
} from '../../utilities/utilities';
import {
    changedPasswordText,
    expiredTokenText,
} from '../../utilities/utilities-texts';
import {noTokenHeaders} from '../../config/apiConfig';
import client from '../../api/apiInstance';

import '../../stylesheets/setPassword.scss';
import colors from '../../stylesheets/config/colors.module.scss';

class SetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMessageShown: '',
            message: '',
            messageColor: '',
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

    setMessageColor = color => {
        this.setState({messageColor: color});
    };

    updateMessage = message => {
        this.setState({
            message: `${message === undefined ? message : null}`,
        });
    };

    async submit(e) {
        e.preventDefault();

        if (
            comparePasswords(
                this.state.password1Reset,
                this.state.password2Reset,
            ) &&
            isPasswordStrong(this.state.password1Reset)
        ) {
            try {
                await client.api.accountResetPasswordCreate(
                    {
                        email: getEmailFromPath(window.location.href),
                        password: this.state.password1Reset,
                        token: getTokenFromPath(window.location.href),
                    },
                    {
                        headers: noTokenHeaders(),
                    },
                );

                this.setMessageColor(colors.colorMessageSuccess);
                this.showMessage(changedPasswordText());
                setTimeout(() => this.setState({shouldRedirect: true}), 5000);
            } catch (error) {
                unsafeLoginApiError(error);
                this.setMessageColor(colors['colorMessageFail']);
                this.updateMessage(expiredTokenText());
            }
        }
    }

    render() {
        if (this.state.shouldRedirect) {
            return <Redirect to="/auth/login" />;
        }
        return (
            <React.Fragment>
                <h1 className="auth-title">Set a new password</h1>
                <h3 className="subtitle">
                    {getEmailFromPath(window.location.href)}
                </h3>
                <form name="recover-form" onSubmit={e => this.submit(e)}>
                    <div className="inputbox-spacer">
                        <input
                            type="password"
                            id="password1Reset"
                            placeholder="New password"
                            onChange={e => {
                                this.change(e);
                            }}
                            onClick={this.updateMessage()}
                        />
                    </div>
                    <div className="inputbox-spacer">
                        <input
                            type="password"
                            id="password2Reset"
                            placeholder="Confirm password"
                            onChange={e => {
                                this.change(e);
                            }}
                            onClick={this.updateMessage()}
                        />
                    </div>
                    <div className="setPassword-button-area">
                        <button type="submit" id="button-set-password">
                            Set new password
                        </button>
                    </div>
                </form>
                <div className="centered auth-info-placeholder" value="">
                    {this.state.message && (
                        <span style={{color: this.state.messageColor}}>
                            {this.state.message}
                        </span>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default SetPassword;
