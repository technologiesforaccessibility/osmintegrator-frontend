import React, {Component} from 'react';
import {NavLink, Route, Switch} from "react-router-dom";
import DashboardMain from "./DashboardMain";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import ProfilePanel from "./ProfilePanel";
import ManagementPanel from "./ManagementPanel";

class ProfileRouter extends Component {
    render() {
        return (
            <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    Profile
                </div>
                <div>
                    <Switch>
                        <Route path="/profile/change-email" exact component={ChangeEmail}/>
                        <Route path="/profile/change-password" exact component={ChangePassword}/>
                        <Route path="/profile" exact component={ProfilePanel}/>
                        <Route path="/manage" exact component={ManagementPanel}/>
                    </Switch>
                </div>

            </div>
        );
    }
}

export default ProfileRouter;