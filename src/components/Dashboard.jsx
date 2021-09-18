import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import {selectAuthIsLoggedIn} from '../redux/selectors/authSelector';

import '../stylesheets/dashboard.scss';

export default function Dashboard({children}) {
  const [propertyGrid, setPropertyGrid] = useState(null);

  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  function updatePropertyGrid(newGrid) {
    setPropertyGrid(newGrid);
  }

  return (
    <>
      <DashboardHeader isLoggedIn={isLoggedIn} />

      <div className="container-fluid">
        <div className="row">
          <DashboardSidebar
            isLoggedIn={isLoggedIn}
            propertyGrid={propertyGrid}
            updatePropertyGrid={updatePropertyGrid}
          />
          {children}
        </div>
      </div>
    </>
  );
}
