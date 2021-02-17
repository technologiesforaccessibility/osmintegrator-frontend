import React, {Component} from 'react';
import "./dashboard.scss"

import DashboardHeader from "./DashboardHeader";
import DashboardSiderbar from "./DashboardSiderbar";
import DashboardMain from "./DashboardMain";
import axios from "axios";
import {Route, Switch} from "react-router-dom";
import Login from "./Login";
import Recover from "./Recover";
import Logout from "./Logout";
import SetPassword from "./SetPassword";
import ProfilePanel from "./ProfilePanel";
import ProfileRouter from "./ProfileRouter";

const {REACT_APP_HAS_ACCESS_PATH} = process.env;

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            canConnectStops: false,
            propertyGrid: null
        }
    }

    componentDidMount() {
        this.hasAccess();
    }

    hasAccess = () => {
        const url = REACT_APP_HAS_ACCESS_PATH;
        axios.get(url,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then(resp => {
                if (resp.status === 200) {
                    console.log("Protected");
                    this.setState({isLoggedIn: true});
                } else {
                    console.log("Token error")
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    console.log("Another token error")

                }
            })
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


    render() {
        return (
            <React.Fragment>
                <DashboardHeader isLoggedIn={this.state.isLoggedIn}/>

                <div className="container-fluid">
                    <div className="row">

                        <DashboardSiderbar isLoggedIn={this.state.isLoggedIn}
                                           connectBusStops={this.canConnectBusStops}
                                           propertyGrid={this.state.propertyGrid}/>
                        <Switch>
                            <Route path="/profile" component={ProfileRouter}/>
                            <Route path="/" component={DashboardMain} canConnectBusStops={this.state.canConnectStops}
                                   setPropertyGrid={this.setPropertyGrid}/>
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