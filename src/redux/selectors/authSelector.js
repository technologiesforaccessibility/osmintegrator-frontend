export const selectAuthIsLoggedIn = state => {
  return state.auth.isLoggedIn;
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
