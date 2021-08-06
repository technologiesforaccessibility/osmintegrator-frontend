import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import { NotificationReducer } from './notificationReducer';


export default combineReducers({
  auth: authReducer,
  notification: NotificationReducer
});
