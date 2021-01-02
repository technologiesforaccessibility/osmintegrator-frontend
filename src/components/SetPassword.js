import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import axios from 'axios';
import './setPassword.scss';

class SetPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
        };

        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    comparePasswords = () => {
        return (this.state.password1 === this.state.password2)
    }

    isPasswordStrong = () => {
        const testedPassword = this.state.password1;
        const pattern = /^\S{8,}$/g;
        return testedPassword.match(pattern);
    }

    submit(e) {
        e.preventDefault();
        if (this.comparePasswords() && this.isPasswordStrong()) {
                    axios.post('https://localhost:44388/api/Account/Login',
            {
                "UserName": this.state.email,
                "Password": this.state.password
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
                localStorage.setItem('tokenData', resp.data.tokenData);
            })
            .catch(error => {
                console.log(error.resp);
            });
        } else {
        //
        }

    }

    render() {
        return (
            <React.Fragment>
                <div className="auth-area">
                    <div className="form-div">
                        <h1 id="title-login">Recover your password</h1>
                        <form name="recover-form" onSubmit={e => this.submit(e)}>
                            <div className="field-area">
                                <input type="text" name="password1" id="email-input" placeholder="New password"
                                       onChange={e => {
                                           this.change(e)
                                       }}/>
                            </div>
                            <div className="field-area">
                                <input type="text" name="password2" id="email-input" placeholder="Confirm password"
                                       onChange={e => {
                                           this.change(e)
                                       }}/>
                            </div>
                            <div className="login-button-area">
                                <button type="submit" id="button-login">Set new password</button>
                            </div>
                        </form>
                        <div className="info-placeholder" value=""></div>
                        <div className="login-button-area">
                                <NavLink to = "/auth/setpassword">
                                    <button type="submit" id="button-login" onClick={e => this.submit(e)}>Enter your reset code</button>
                                </NavLink>
                            </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SetPassword;