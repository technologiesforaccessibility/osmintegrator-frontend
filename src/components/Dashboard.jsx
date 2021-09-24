import {useSelector} from 'react-redux';

import DashboardHeader from './DashboardHeader';
import Footer from './Footer';
import {selectAuthIsLoggedIn} from '../redux/selectors/authSelector';

import '../stylesheets/dashboard.scss';

export default function Dashboard({children}) {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <DashboardHeader isLoggedIn={isLoggedIn} />
      </div>
      <div className="dashboard__content">{children}</div>
      <div className="dashboard__footer">
        <Footer />
      </div>
    </div>
  );
}
