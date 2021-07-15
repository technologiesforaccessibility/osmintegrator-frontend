import {createReducer} from '@reduxjs/toolkit';

import {login, logout, validateLogin} from '../actions/authActions';

const initialState = {
  isLoggedIn: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
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


function parseToken(token) {
  const [, base64Url] = token.split('.');
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => {
        return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`;
      })
      .join(''),
  );

  const parsedToken = JSON.parse(jsonPayload);

  const roleKey = Object.keys(parsedToken).find((key) => key.search(('role')) > -1);

  if (roleKey) {
    const role = parsedToken[roleKey];

    if (Array.isArray(role)) {
      parsedToken.roles = role;
    } else {
      parsedToken.roles = [role];
    }
  }

  return parsedToken;
}

const authReducer = createReducer(initialState, (builder) => {
  function handleRejected(state, action) {
    state.isLoggedIn = false;
    state.loading = false;
    state.error = true;
    state.token = undefined;
    state.loggedInUserRoles = undefined;

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
      const { token, refreshToken } = action.payload;
      const { roles } = parseToken(token);

      state.isLoggedIn = true;
      state.loading = false;
      state.token = token;
      state.loggedInUserRoles = roles;

      setTokens(token, refreshToken);
    })
    .addCase(login.rejected, handleRejected)
    .addCase(logout, (state) => {
      state.isLoggedIn = false;
      state.token = undefined;
      state.loggedInUserRoles = undefined;

      setTokens();
    })
    .addCase(validateLogin.pending, handlePending)
    .addCase(validateLogin.fulfilled, (state) => {
      const token = localStorage.getItem('token');
      const { roles } = parseToken(token);

      state.isLoggedIn = true;
      state.loading = false;
      state.token = token;
      state.loggedInUserRoles = roles;
    })
    .addCase(validateLogin.rejected, (state) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.token = undefined;
      state.loggedInUserRoles = undefined;
    })
});

export default authReducer;
