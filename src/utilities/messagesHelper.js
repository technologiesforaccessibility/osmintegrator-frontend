import store from '../redux/store';
import i18n from '../translations/i18n';
import { NotificationActions } from '../redux/actions/notificationActions';

export function webError(response) {
  function error400(error) {
    // Validation problem
    if (error.title === 'One or more validation errors occurred.') {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(error.errors);
      }
      store.dispatch(NotificationActions.error(i18n.t('error.validationError')));
      return;
    }

    // Other problems
    if (error.errors.message[0]) store.dispatch(NotificationActions.error(error.errors.message[0]));
  }

  function error403() {
    store.dispatch(NotificationActions.error(i18n.t('error.authorization')));
  }

  function error401() {
    store.dispatch(NotificationActions.error(i18n.t('error.authentication')));
  }

  function error500(res) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(res);
    }
    store.dispatch(NotificationActions.error(i18n.t('error.internalServerError')));
  }

  try {
    if (!response || !response.error) {
      store.dispatch(NotificationActions.error(i18n.t('error.errorIsNull')));
      return;
    }

    switch (response.status) {
      case 400:
        error400(response.error);
        break;
      case 403:
        error403();
        break;
      case 401:
        error401();
        break;
      case 500:
        error500(response.error);
        break;
      default:
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log(response);
        }
        store.dispatch(NotificationActions.error(i18n.t('error.unrecognizedProblem')));
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    store.dispatch(NotificationActions.error(i18n.t('error.unableToShowErrorMessage')));
  }
}
