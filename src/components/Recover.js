import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import axios from 'axios';
import './recover.scss';

class Recover extends Component {

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

    submit(e) {
        e.preventDefault();
        // const url = {{host}} + '/api/Account/ForgotPassword';

        axios.post('https://localhost:44388/api/Account/Login',
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
                localStorage.setItem('tokenData', resp.data.tokenData);
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
                                       }}/>
                            </div>
                            <div className="login-button-area">
                                <button type="submit" id="button-login">Reset your password</button>
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

export default Recover;