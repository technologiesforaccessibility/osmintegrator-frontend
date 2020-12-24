import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './login.scss';

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
    }

    render() {
        return (

            <div className="login-area">
                <div className="form-div">
                    <h1 id="title-login">Welcome</h1>
                    <form onSubmit={e => this.submit(e)}>
                        <div className="field-area">
                            <input type="text" name="email" id="username-input" placeholder="User name" onChange={e => {
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
                    <div className="link"><NavLink to="/">Forgot Username / Password ?</NavLink></div>
                    <div className="link"><NavLink to="/">Create an account? Sign up</NavLink></div>
                    <div className="info-placeholder" value=""></div>
                </div>
            </div>
        );
    }
}

export default Login;