import { TAppState } from '../reducers/appReducer';
import { TAuthState } from '../reducers/authReducer';
import { TNotificationState } from '../reducers/notificationReducer';

type TState = {
  auth: TAuthState;
  notification: TNotificationState;
  app: TAppState;
};

export const selectAuthIsLoggedIn = (state: TState) => {
  return state.auth.isLoggedIn;
};

export const selectAuthToken = (state: TState) => {
  return state.auth.token;
};

export const selectLoggedInUserRoles = (state: TState) => {
  return state.auth.loggedInUserRoles;
};

export const selectUserName = (state: TState) => {
  return state.auth.name;
};

export const selectAuthLoading = (state: TState) => {
  return state.auth.loading;
};

export const selectAuthError = (state: TState) => {
  if (!state.auth.error) {
    return null;
  }

  return {
    status: state.auth.errorStatus,
    error: state.auth.error,
    message: state.auth.errorMessage,
  };
};

export const selectNotification = (state: TState) => {
  return state.notification;
};

export const selectVersion = (state: TState) => {
  return state.app.version;
};
