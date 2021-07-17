import {createAsyncThunk, createAction} from '@reduxjs/toolkit';

import client from '../../api/apiInstance';
import {basicHeaders, noTokenHeaders} from '../../config/apiConfig';

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  return client.api
    .accountLoginCreate(data, {headers: noTokenHeaders()})
    .then(response => response.data)
    .catch(response => {
      if (response.error) {
        response.error.status = response.status;
      }

      throw thunkAPI.rejectWithValue(response.error);
    });
});

export const validateLogin = createAsyncThunk('auth/validateLogin', async (data, thunkAPI) => {
  return client.api
    .accountIsTokenValidList({headers: basicHeaders()})
    .then(response => {
      console.log('Valid token');

      return response.data;
    })
    .catch(response => {
      if (response.error) {
        response.error.status = response.status;
      }

      throw thunkAPI.rejectWithValue({
        status: response.status,
        // message: response.error.message,
        message: 'Token validation error',
        title: response.error.title,
      });
    });
});

export const logout = createAction('auth/logout');
