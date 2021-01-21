import React, {Component} from 'react';
import axios from 'axios';

import './recover.scss';
import colors from './colors.module.scss';

import {formError400Text, sentResetLinkText} from "./utilities-texts";
import {postDefaultHeaders} from '../config/apiConfig';

const {REACT_APP_RESET_PASS_PATH} = process.env;


class Recover extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            isMessageShown: false,
            message: '',
            messageColor: ''
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

    setMessageColor = (color) => {
        this.setState({messageColor: color})
    }

    showSuccessMessage = () => {
        this.setState({isMessageShown: true});
    };

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
        const url = REACT_APP_RESET_PASS_PATH;

        axios.post(url,
            {
                "Email": this.state.recoverEmail,
            },
            {
                headers: postDefaultHeaders()
            })
            .then(resp => {
                if (resp.status === 200) {
                    this.setMessageColor(colors['colorMessageSuccess']);
                    this.showMessage(sentResetLinkText());
                }
            })
            .catch(error => {
                this.setMessageColor(colors['colorMessageFail'])
                if (error.response.status === 401) {
                    this.showMessage(error.response.data.message);
                } else if (error.response.status === 400) {
                    this.showMessage(formError400Text())
                } else {
                    console.warn("Undefined error");
                }
            });

    }

    render() {
        return (
            <React.Fragment>
                        <h1 className="auth-title">Recover your password</h1>
                        <form name="recover-form" onSubmit={e => this.submit(e)}>
                            <div className="inputbox-spacer">
                                <input type="text" id="recoverEmail" placeholder="Email"
                                       onChange={e => {
                                           this.change(e)
                                       }} onClick={this.hideMessage}/>
                            </div>
                            <div className="recover-button-area">
                                <button type="submit" id="button-reset">Reset your password</button>
                            </div>
                        </form>
                        <div className="centered auth-info-placeholder" value="">{this.state.isMessageShown &&
                        <span style={{color: this.state.messageColor}}>{this.state.message}</span>}</div>
            </React.Fragment>
        );
    }
}

export default Recover;