import store from '../redux/store';
import i18n from '../translations/i18n';
import { NotificationActions } from '../redux/actions/notificationActions';

export function webError(response) {

  function error400(error) {
    // Validation problem
    if (error.title === 'One or more validation errors occurred.') {
      console.log(error.errors);
      store.dispatch(NotificationActions.error(i18n.t('error.validationError')));
      return;
    }

    // Other problems
    error.errors.message[0] &&
      store.dispatch(NotificationActions.error(error.errors.message[0]));
  }

  function error403() {
    store.dispatch(NotificationActions.error(i18n.t('error.authentication')));
  }

  function error401() {
    store.dispatch(NotificationActions.error(i18n.t('error.authorization')));
  }

  function error500(response) {
    console.log(response);
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
        console.log(response);
        store.dispatch(NotificationActions.error(i18n.t('error.unrecognizedProblem')));
    }
  }
  catch (error) {
    console.log(error);
    store.dispatch(NotificationActions.error(i18n.t('error.unableToShowErrorMessage')));
  }
}