import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../api/apiInstance';
import { noTokenHeaders } from '../../config/apiConfig';

export const getVersion = createAsyncThunk('version/getVersion', async (data, thunkAPI) => {
  return api
    .versionList({ headers: noTokenHeaders() })
    .then(response => {
      return response.data;
    })
    .catch(response => {
      if (response.error) {
        response.error.status = response.status;
      }

      throw thunkAPI.rejectWithValue(response.error);
    });
});
