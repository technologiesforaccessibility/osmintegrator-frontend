import { webError } from './messagesHelper';
import i18n from '../translations/i18n';
import { paths } from '../utilities/constants';
import store from '../redux/store';
import { NotificationActions } from '../redux/actions/notificationActions';
import { logout } from '../redux/actions/authActions';

export function exception(error) {
  console.log(error);
  if (error instanceof Response) {
    webError(error);
    // Logout user when token has expired
    if (error.status === 401) {
      store.dispatch(logout());
      // HACK: It's ugly but I didn't find better way to redirect without passing
      // 'rect-router-dom' history object. I didn't wanted to do that for each function.
      window.location.href = paths.LOGOUT;
    }
    return;
  }
  store.dispatch(NotificationActions.error(i18n.t('error.exception')));
}
