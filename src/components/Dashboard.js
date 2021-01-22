import React, {Component} from 'react';
import "./dashboard.css"

import DashboardHeader from "./DashboardHeader";
import DashboardSiderbar from "./DashboardSiderbar";
import DashboardMain from "./DashboardMain";

class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <DashboardHeader />

                <div className="container-fluid">
                    <div className="row">

                        <DashboardSiderbar/>
                        <DashboardMain />

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