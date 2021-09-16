import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import DashboardHeader from './DashboardHeader';
import DashboardSiderbar from './DashboardSiderbar';
import {selectAuthIsLoggedIn} from '../redux/selectors/authSelector';

import '../stylesheets/dashboard.scss';

export default function Dashboard({children}) {
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
          {children}
        </div>
      </div>
    </React.Fragment>
  );
}
