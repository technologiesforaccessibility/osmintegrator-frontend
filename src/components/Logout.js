import React, {Component} from 'react';
import {NavLink, Redirect} from "react-router-dom";
import colors from "./colors.module.scss";

class Logout extends Component {
    constructor(props) {
        super(props);

        this.state= {
            message: "You will be redirect to login page soon."
        }
    }


    componentDidMount() {
        setTimeout(() => this.setState({ shouldRedirect: true }), 7000);
    }

    render() {
        if (this.state.shouldRedirect) {
            return <Redirect to="/auth/login"/>
        }

        return (
            <React.Fragment>
                <h1 className="auth-title">You have been logged out</h1>
                <div className="auth-info-placeholder centered" value="">
                <span style={{paddingTop: "10px", color: colors['colorMessageSuccess']}}>{this.state.message}</span></div>
            </React.Fragment>
        );
    }
}

export default Logout;