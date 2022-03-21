import { logout } from '../redux/actions/authActions';
import { NotificationActions } from '../redux/actions/notificationActions';
import store from '../redux/store';
import i18n from '../translations/i18n';
import { paths } from './constants';
import { webError } from './messagesHelper';

export function exception(error: any) {
  // eslint-disable-next-line no-console
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
