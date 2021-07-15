import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import {useSelector} from 'react-redux';

import DashboardHeader from './DashboardHeader';
import DashboardSiderbar from './DashboardSiderbar';
import DashboardMain from './DashboardMain';
import ProfileRouter from './ProfileRouter';
import ManagementPanel from './ManagementPanel';
import {selectAuthIsLoggedIn} from '../redux/selectors/authSelector';

import '../stylesheets/dashboard.scss';

export default function Dashboard() {
  const [propertyGrid, setPropertyGrid] = useState(null);

  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  function updatePropertyGrid(newGrid) {
    setPropertyGrid(newGrid);
  }

  return (
    <React.Fragment>
      <DashboardHeader isLoggedIn={isLoggedIn} />

      <div className="container-fluid">
        <div className="row">
          <DashboardSiderbar
            isLoggedIn={isLoggedIn}
            propertyGrid={propertyGrid}
            updatePropertyGrid={updatePropertyGrid}
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
