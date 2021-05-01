import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import colors from '../stylesheets/colors.module.scss';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldRedirect: false,
        };
    }

    componentDidMount() {
        setTimeout(() => this.proceedLogOut(), 7000);
    }

    proceedLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenRefresh');
        this.setState({shouldRedirect: true});
    };

    render() {
        if (this.state.shouldRedirect) {
            return <Redirect to="/auth/login" />;
        }

        return (
            <React.Fragment>
                <h1 className="auth-title">You have been logged out</h1>
                <div className="auth-info-placeholder centered" value="">
                    <span
                        style={{
                            paddingTop: '10px',
                            color: colors.colorMessageSuccess,
                        }}>
                        You will be redirect to login page soon.
                    </span>
                </div>
            </React.Fragment>
        );
    }
}

export default Logout;
