import { combineReducers } from '@reduxjs/toolkit';

import appSlice from './appReducer';
import authReducer from './authReducer';
import { NotificationReducer } from './notificationReducer';

const reducersObject = {
  auth: authReducer,
  notification: NotificationReducer,
  app: appSlice.reducer,
};

export type TReducer = typeof reducersObject;

export default combineReducers(reducersObject);
