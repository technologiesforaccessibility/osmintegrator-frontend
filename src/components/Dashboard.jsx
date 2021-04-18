import React, {Component} from 'react';
import "../stylesheets/dashboard.scss"

import DashboardHeader from "./DashboardHeader";
import DashboardSiderbar from "./DashboardSiderbar";
import DashboardMain from "./DashboardMain";
import {Route, Switch} from "react-router-dom";
import ProfileRouter from "./ProfileRouter";

import client from "../api/apiInstance";
import {getDefaultHeadersWithToken} from '../config/apiConfig';
import ManagementPanel from "./ManagementPanel";


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            canConnectStops: false,
            propertyGrid: null
        }

        this.hasAccess = this.hasAccess.bind(this);
    }

    componentDidMount() {
        this.hasAccess();
    }

    async hasAccess() {
        try {
            const response = await client.api.accountIsTokenValidList({
                headers: getDefaultHeadersWithToken(localStorage.token)
            })
            if (response.status === 200) {
                console.log("Valid token");
                this.setState({isLoggedIn: true});
            }
        } catch (error) {
                console.log("Token validation error")
        }
    }

    canConnectBusStops = (bool) => {
        this.setState({canConnectStops: bool})
    }

    setPropertyGrid = (busStopProps) => {
        if (busStopProps) {
            this.setState({propertyGrid: busStopProps})
        } else {
            this.setState({propertyGrid: null})
        }
    }

    updatePropertyGrid = (newGrid) => {
        this.setState({propertyGrid: newGrid})
    }


    render() {
        return (
            <React.Fragment>
                <DashboardHeader isLoggedIn={this.state.isLoggedIn}/>

                <div className="container-fluid">
                    <div className="row">

                        <DashboardSiderbar isLoggedIn={this.state.isLoggedIn}
                                           connectBusStops={this.canConnectBusStops}
                                           propertyGrid={this.state.propertyGrid}
                                           updatePropertyGrid={this.updatePropertyGrid}/>
                        <Switch>
                            <Route path="/profile" component={ProfileRouter}/>
                            <Route path="/manage" component={ManagementPanel}/>
                            <Route path="/"
                                   render={() => (
                                       <DashboardMain canConnectBusStops={this.state.canConnectStops}
                                                      setPropertyGrid={this.setPropertyGrid}/>
                                   )}
                            />
                        </Switch>
                    </div>
                </div>


                <script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js"
                        integrity="sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE"
                        crossOrigin="anonymous"/>
            </React.Fragment>
        );
    }
}

export default Dashboard;