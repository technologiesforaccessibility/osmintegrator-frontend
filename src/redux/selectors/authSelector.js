export const selectAuthIsLoggedIn = state => {
  return state.auth.isLoggedIn;
};

<<<<<<< HEAD
export const selectAuthToken = (state) => {
  return state.auth.token;
}

export const selectLoggedInUserRoles = (state) => {
  return state.auth.loggedInUserRoles;
}

export const selectAuthLoading = (state) => {
=======
export const selectAuthLoading = state => {
>>>>>>> 0674d0b73864091dd35247767e9ab8f006d79e29
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
