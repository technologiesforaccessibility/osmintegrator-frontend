import React, {Component} from 'react';
import {NavLink} from "react-router-dom";


class ProfilePanel extends Component {
    render() {
        return (

                    <ul>
                        <li>
                            <NavLink to="/profile/change-email">Change e-mail</NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile/change-password">Change password</NavLink>

                        </li>
                        <li>
                            About you
                        </li>
                    </ul>

        );
    }
}

export default ProfilePanel;