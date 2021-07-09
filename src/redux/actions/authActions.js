import {createAsyncThunk} from '@reduxjs/toolkit';

import client from '../../api/apiInstance';
import {noTokenHeaders} from '../../config/apiConfig';

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  return client.api.accountLoginCreate(data, {headers: noTokenHeaders()})
    .then((response) => response.data)
    .catch((response) => {
      if (response.error) {
        response.error.status = response.status;
      }

      throw thunkAPI.rejectWithValue(response.error)
    });
});
