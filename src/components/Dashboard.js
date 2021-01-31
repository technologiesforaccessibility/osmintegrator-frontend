import React, {Component} from 'react';
import "./dashboard.scss"

import DashboardHeader from "./DashboardHeader";
import DashboardSiderbar from "./DashboardSiderbar";
import DashboardMain from "./DashboardMain";
import axios from "axios";

const {REACT_APP_HAS_ACCESS_PATH} = process.env;

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
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


    render() {
        return (
            <React.Fragment>
                <DashboardHeader isLoggedIn={this.state.isLoggedIn}/>

                <div className="container-fluid">
                    <div className="row">

                        <DashboardSiderbar isLoggedIn={this.state.isLoggedIn}/>
                        <DashboardMain/>

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