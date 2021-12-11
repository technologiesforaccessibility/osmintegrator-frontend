import {FC} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {paths} from '../utilities/constants';
import Login from './auth/Login';
import Logout from './auth/Logout';
import Recover from './auth/Recover';
import RecoverConfirm from './auth/RecoverConfirm';
import Register from './auth/Register';
import RegisterActivated from './auth/RegisterActivated';
import RegisterConfirm from './auth/RegisterConfirm';
import ResetConfirm from './auth/ResetConfirm';
import SetPassword from './auth/SetPassword';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import DashboardMain from './DashboardMain';
import ManagementPanel from './managementPanel/ManagementPanel';
import PrivateRoute from './PrivateRoute';
import ProfilePanel from './ProfilePanel';

const Navigation: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path={paths.LOGIN} component={Login} />
          <Route path={paths.REGISTER} component={Register} />
          <Route path={paths.REGISTER_CONFIRM} component={RegisterConfirm} />
          <Route path={paths.REGISTER_ACTIVATED} component={RegisterActivated} />
          <Route path={paths.RECOVER_PASSWORD} component={Recover} />
          <Route path={paths.RECOVER_CONFIRM} component={RecoverConfirm} />
          <Route path={paths.LOGOUT} component={Logout} />
          <Route path={paths.RESET_PASSWORD} component={SetPassword} />
          <Route path={paths.CHANGE_PASSWORD_CONFIRM} component={ResetConfirm} />
          <PrivateRoute path={paths.MANAGEMENT_PANEL} exact component={ManagementPanel} />
          <PrivateRoute path={paths.CHANGE_EMAIL} exact component={ChangeEmail} />
          <PrivateRoute path={paths.CHANGE_PASSWORD} exact component={ChangePassword} />
          <PrivateRoute path={paths.PROFILE} exact component={ProfilePanel} />
          <PrivateRoute path={paths.HOME} exact component={DashboardMain} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Navigation;
