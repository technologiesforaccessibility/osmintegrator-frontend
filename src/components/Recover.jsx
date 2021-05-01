import React, {Component} from 'react';

import {sentResetLinkText} from '../utilities/utilities-texts';
import {noTokenHeaders} from '../config/apiConfig';
import client from '../api/apiInstance';
import {unsafeLoginApiError} from '../utilities/utilities';

import '../stylesheets/recover.scss';
import colors from '../stylesheets/colors.module.scss';

class Recover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            isMessageShown: false,
            message: null,
            messageColor: '',
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
            message: `${message === undefined ? message : null}`
        });
    };

    async submit(e) {
        e.preventDefault();

        try {
            await client.api.accountForgotPasswordCreate(
                {
                    email: this.state.recoverEmail,
                },
                {headers: noTokenHeaders()},
            );
            this.setMessageColor(colors['colorMessageSuccess']);
            this.updateMessage(sentResetLinkText());
        } catch (error) {
            this.setMessageColor(colors['colorMessageFail']);
            this.updateMessage('Cannot send reset email');
            unsafeLoginApiError(error);
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1 className="auth-title">Recover your password</h1>
                <form name="recover-form" onSubmit={e => this.submit(e)}>
                    <div className="inputbox-spacer">
                        <input
                            type="text"
                            id="recoverEmail"
                            placeholder="Email"
                            onChange={e => {
                                this.change(e);
                            }}
                            onClick={this.updateMessage()}
                        />
                    </div>
                    <div className="recover-button-area">
                        <button type="submit" id="button-reset">
                            Reset your password
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

export default Recover;
