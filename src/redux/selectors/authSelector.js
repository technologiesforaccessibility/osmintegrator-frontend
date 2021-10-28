export const selectAuthIsLoggedIn = state => {
  return state.auth.isLoggedIn;
};

export const selectAuthToken = state => {
  return state.auth.token;
};

export const selectLoggedInUserRoles = state => {
  return state.auth.loggedInUserRoles;
};

export const selectAuthLoading = state => {
  return state.auth.loading;
};

export const selectAuthError = state => {
  if (!state.auth.error) {
    return null;
  }

  return {
    status: state.auth.errorStatus,
    error: state.auth.error,
    message: state.auth.errorMessage,
  };
};

export const selectNotification = state => {
  return state.notification;
};

export const selectVersion = state => {
  return state.app.version;
};
