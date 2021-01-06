import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import axios from 'axios';
import './recover.scss';
import {sentResetLinkText} from "./utilities-texts";

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
            [e.target.name]: e.target.value
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
                "Email": this.state.email,
            },
            {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then(resp => {
                console.log(resp);
                if (resp.data.isSuccess) {
                    this.setMessageColor("#134a1e")
                    this.showMessage(sentResetLinkText());
                } else {
                    this.setMessageColor("maroon")
                    this.showMessage(resp.data.errorMsg);
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
                        <h1 id="title-login">Recover your password</h1>
                        <form name="recover-form" onSubmit={e => this.submit(e)}>
                            <div className="field-area">
                                <input type="text" name="email" id="email-input" placeholder="Email"
                                       onChange={e => {
                                           this.change(e)
                                       }} onClick={this.hideMessage}/>
                            </div>
                            <div className="login-button-area">
                                <button type="submit" id="button-login">Reset your password</button>
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

export default Recover;