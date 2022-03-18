import { createSlice } from '@reduxjs/toolkit';

import { getVersion } from '../actions/appActions';

export type TAppState = {
  version: string;
};

const initialState: TAppState = {
  version: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getVersion.pending, state => {
        state.version = 'Loading...';
      })
      .addCase(getVersion.fulfilled, (state, action) => {
        state.version = action.payload;
      })
      .addCase(getVersion.rejected, state => {
        state.version = '-';
      });
  },
});

export default appSlice;
