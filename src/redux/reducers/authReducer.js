import {createReducer} from '@reduxjs/toolkit';

import {login} from '../actions/authActions';

const initialState = {
  isLoggedIn: !!localStorage.getItem('token'),
  error: false,
  errorMessage: undefined,
  errorStatus: undefined,
  loading: false
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.errorMessage = undefined;
      state.errorStatus = undefined;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.loading = false;

      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('tokenRefresh', action.payload.refreshToken);
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = true;

      if (action.payload) {
        state.errorMessage = action.payload.message;
        state.errorStatus = action.payload.status;
      } else {
        state.errorMessage = undefined;
        state.errorStatus = undefined;
      }

      localStorage.removeItem('token');
      localStorage.removeItem('tokenRefresh');
    })
    .addDefaultCase((state, action) => {})
});

export default authReducer;
