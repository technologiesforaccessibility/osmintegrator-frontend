import RecoverConfirm from 'paths/auth/Confirm/RecoverConfirm';
import RegisterConfirm from 'paths/auth/Confirm/RegisterConfirm';
import ResetConfirm from 'paths/auth/Confirm/ResetConfirm';
import Login from 'paths/auth/Login/Login';
import Logout from 'paths/auth/Logout';
import Recover from 'paths/auth/Recover';
import Register from 'paths/auth/Register/Register';
import RegisterActivated from 'paths/auth/RegisterActivated/RegisterActivated';
import SetPassword from 'paths/auth/SetPassword/SetPassword';
import ChangeEmail from 'paths/ChangeEmail';
import ChangePassword from 'paths/ChangePassword';
import Home from 'paths/Home';
import ManagementPanel from 'paths/ManagementPanel/ManagementPanel';
import ProfilePanel from 'paths/ProfilePanel';
import { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { paths } from 'utilities/constants';

import PrivateRoute from './PrivateRoute';

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
          <PrivateRoute path={paths.HOME} exact component={Home} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Navigation;
