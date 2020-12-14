import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
        };

        this.change = this.change.bind(this);  
        this.submit = this.submit.bind(this);
    }

    change(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    submit(e){
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

    render(){
        return (
            <form onSubmit={e => this.submit(e)}>
                <label>email: </label> <input type="text" name="email" onChange={ e => {this.change(e)}}></input>
                <label>password: </label> <input type="password" name="password" onChange={ e => {this.change(e)}}></input>

                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default Login;