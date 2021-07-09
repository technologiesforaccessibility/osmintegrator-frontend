import {createReducer} from '@reduxjs/toolkit';

import {login, logout, validateLogin} from '../actions/authActions';

const initialState = {
  isLoggedIn: !!localStorage.getItem('token'),
  error: false,
  errorMessage: undefined,
  errorStatus: undefined,
  loading: false
};

function setTokens(token, refreshToken) {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }

  if (refreshToken) {
    localStorage.setItem('tokenRefresh', refreshToken);
  } else {
    localStorage.removeItem('refreshToken');
  }
}

const authReducer = createReducer(initialState, (builder) => {
  function handleRejected(state, action) {
    state.isLoggedIn = false;
    state.loading = false;
    state.error = true;

    if (action.payload) {
      state.errorMessage = action.payload.message;
      state.errorStatus = action.payload.status;
    } else {
      state.errorMessage = undefined;
      state.errorStatus = undefined;
    }

    setTokens();
  }

  function handlePending(state) {
    state.loading = true;
    state.error = false;
    state.errorMessage = undefined;
    state.errorStatus = undefined;
  }

  builder
    .addCase(login.pending, handlePending)
    .addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.loading = false;

      const { token, refreshToken } = action.payload;

      setTokens(token, refreshToken);
    })
    .addCase(login.rejected, handleRejected)
    .addCase(logout, (state, action) => {
      state.isLoggedIn = false;

      setTokens();
    })
    .addCase(validateLogin.pending, handlePending)
    .addCase(validateLogin.fulfilled, (state) => {
      state.isLoggedIn = true;
      state.loading = false;
    })
    .addCase(validateLogin.rejected, handleRejected)
});

export default authReducer;
