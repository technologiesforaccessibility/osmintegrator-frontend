import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import './login.scss';

const { REACT_APP_BACKEND_HOST } = process.env;
const { REACT_APP_LOGIN_PATH } = process.env;
const { REACT_APP_HTTP } = process.env;

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
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
        const url = REACT_APP_HTTP + REACT_APP_BACKEND_HOST + REACT_APP_LOGIN_PATH;
        console.log(url);
        axios.post(url,
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
                                       }}/>
                            </div>
                            <div className="field-area">
                                <input type="password" name="password" id="password-input" placeholder="Password"
                                       onChange={e => {
                                           this.change(e)
                                       }}/>
                            </div>
                            <div className="login-button-area">
                                <button type="submit" id="button-login">Log in</button>
                            </div>

                        </form>
                        <div className="link"><NavLink to="/auth/recover">Forgot Username / Password ?</NavLink></div>
                        <div className="link"><NavLink to="/">Create an account? Sign up</NavLink></div>
                        <div className="info-placeholder" value=""></div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;