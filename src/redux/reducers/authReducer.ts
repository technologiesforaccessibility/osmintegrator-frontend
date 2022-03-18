import { createReducer } from '@reduxjs/toolkit';

import { login, logout, validateLogin } from '../actions/authActions';

export type TAuthState = {
  isLoggedIn: boolean;
  token?: string;
  error: boolean;
  errorMessage?: string;
  errorStatus?: string;
  loading: boolean;
  loggedInUserRoles?: string[];
  name?: string;
};

const initialState: TAuthState = {
  isLoggedIn: !!localStorage.getItem('token'),
  token: localStorage.getItem('token') ?? '',
  error: false,
  errorMessage: undefined,
  errorStatus: undefined,
  loading: false,
  loggedInUserRoles: [],
};

function setTokens(token?: string, refreshToken?: string) {
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

function parseToken(token: string) {
  const [, base64Url] = token.split('.');
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join(''),
  );

  const parsedToken = JSON.parse(jsonPayload);

  const roleKey = Object.keys(parsedToken).find(key => key.search('role') > -1);
  const nameKey = Object.keys(parsedToken).find(key => key.includes('name') && !key.includes('identifier'));

  if (roleKey) {
    const role = parsedToken[roleKey];

    if (Array.isArray(role)) {
      parsedToken.roles = role;
    } else {
      parsedToken.roles = [role];
    }
  }

  if (nameKey) {
    const name = parsedToken[nameKey];
    parsedToken.name = name;
  }

  return parsedToken;
}

const authReducer = createReducer(initialState, builder => {
  function handleRejected(state: any, action: any) {
    state.isLoggedIn = false;
    state.loading = false;
    state.error = true;
    state.token = undefined;
    state.loggedInUserRoles = undefined;
    state.name = undefined;

    if (action.payload) {
      state.errorMessage = action.payload.message;
      state.errorStatus = action.payload.status;
    } else {
      state.errorMessage = undefined;
      state.errorStatus = undefined;
    }

    setTokens();
  }

  function handlePending(state: any) {
    state.loading = true;
    state.error = false;
    state.errorMessage = undefined;
    state.errorStatus = undefined;
  }

  builder
    .addCase(login.pending, handlePending)
    .addCase(login.fulfilled, (state, action) => {
      const { token, refreshToken } = action.payload;
      const { roles, name } = parseToken(token);

      state.isLoggedIn = true;
      state.loading = false;
      state.token = token;
      state.loggedInUserRoles = roles;
      state.name = name;
      setTokens(token, refreshToken);
    })
    .addCase(login.rejected, handleRejected)
    .addCase(logout, state => {
      state.isLoggedIn = false;
      state.token = undefined;
      state.loggedInUserRoles = undefined;
      state.name = undefined;

      setTokens();
    })
    .addCase(validateLogin.pending, handlePending)
    .addCase(validateLogin.fulfilled, state => {
      const token = localStorage.getItem('token') ?? '';
      const { roles, name } = parseToken(token);

      state.isLoggedIn = true;
      state.loading = false;
      state.token = token;
      state.loggedInUserRoles = roles;
      state.name = name;
    })
    .addCase(validateLogin.rejected, state => {
      state.isLoggedIn = false;
      state.loading = false;
      state.token = undefined;
      state.loggedInUserRoles = undefined;
      state.name = undefined;
    });
});

export default authReducer;
