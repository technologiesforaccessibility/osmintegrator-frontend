import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";

import DashboardHeader from './DashboardHeader';
import DashboardSiderbar from './DashboardSiderbar';
import DashboardMain from './DashboardMain';
import ProfileRouter from './ProfileRouter';
import ManagementPanel from './ManagementPanel';
import {validateLogin} from '../redux/actions/authActions';

import '../stylesheets/dashboard.scss';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyGrid: null,
    };
  }

  componentDidMount() {
    this.props.validateLogin();
  }

  updatePropertyGrid = newGrid => {
    this.setState({propertyGrid: newGrid});
  };

  render() {
    return (
      <React.Fragment>
        <DashboardHeader isLoggedIn={this.props.auth.isLoggedIn} />

        <div className="container-fluid">
          <div className="row">
            <DashboardSiderbar
              isLoggedIn={this.props.auth.isLoggedIn}
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

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  validateLogin: () => dispatch(validateLogin())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
