import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginData } from 'api/apiClient';
import api from 'api/apiInstance';
import { basicHeaders, noTokenHeaders } from 'config/apiConfig';

export const login = createAsyncThunk('auth/login', async (data: LoginData, thunkAPI) => {
  return api
    .accountLoginCreate(data, { headers: noTokenHeaders() })
    .then(response => response.data)
    .catch(response => {
      if (response.error) {
        response.error.status = response.status;
      }

      throw thunkAPI.rejectWithValue(response.error);
    });
});

export const validateLogin = createAsyncThunk('auth/validateLogin', async (data, thunkAPI) => {
  return api
    .accountIsTokenValidList({ headers: basicHeaders() })
    .then(response => {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('Valid token');
      }

      return response.data;
    })
    .catch(response => {
      if (response.error) {
        response.error.status = response.status;
      }

      throw thunkAPI.rejectWithValue({
        status: response.status,
        message: 'Token validation error',
        title: response.error.title,
      });
    });
});

export const logout = createAction('auth/logout');
