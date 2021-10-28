import {createSlice} from '@reduxjs/toolkit';

import {getVersion} from '../actions/appActions';

const initialState = {
  version: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,

  extraReducers: {
    [getVersion.pending]: state => {
      state.version = 'Loading...';
    },
    [getVersion.fulfilled]: (state, {payload}) => {
      state.version = payload;
    },
    [getVersion.rejected]: state => {
      state.version = '-';
    },
  },
});

export default appSlice;
