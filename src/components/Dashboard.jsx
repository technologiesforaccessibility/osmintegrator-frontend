import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import DashboardHeader from './DashboardHeader';
import DashboardSiderbar from './DashboardSiderbar';
import DashboardMain from './DashboardMain';
import ProfileRouter from './ProfileRouter';
import client from '../api/apiInstance';
import {basicHeaders} from '../config/apiConfig';
import ManagementPanel from './ManagementPanel';
import {unsafeApiError} from "../utilities/utilities";

import '../stylesheets/dashboard.scss';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
        };
        this.hasAccess = this.hasAccess.bind(this);
    }

    componentDidMount() {
        this.hasAccess();
    }

    async hasAccess() {
        try {
            await client.api.accountIsTokenValidList({
                headers: basicHeaders(),
            });
            console.log('Valid token');
            this.setState({isLoggedIn: true});
        } catch (error) {
            unsafeApiError(error,'Token validation error')
        }
    }

    updatePropertyGrid = newGrid => {
        this.setState({propertyGrid: newGrid});
    };

    render() {
        return (
            <React.Fragment>
                <DashboardHeader isLoggedIn={this.state.isLoggedIn} />

                <div className="container-fluid">
                    <div className="row">
                        <DashboardSiderbar
                            isLoggedIn={this.state.isLoggedIn}
                            connectBusStops={this.canConnectBusStops}
                            updatePropertyGrid={this.updatePropertyGrid}
                        />
                        <Switch>
                            <Route path="/profile" component={ProfileRouter} />
                            <Route path="/manage" component={ManagementPanel} />
                            <Route path="/" render={() => <DashboardMain />} />
                        </Switch>
                    </div>
                </div>

                <script
                    src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js"
                    integrity="sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE"
                    crossOrigin="anonymous"
                />
            </React.Fragment>
        );
    }
}

export default Dashboard;
