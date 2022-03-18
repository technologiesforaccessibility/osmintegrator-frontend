import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './appReducer';
import authReducer from './authReducer';
import { NotificationReducer } from './notificationReducer';

export default combineReducers({
  auth: authReducer,
  notification: NotificationReducer,
  app: appSlice.reducer,
});
