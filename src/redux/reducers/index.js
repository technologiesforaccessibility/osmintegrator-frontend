import {combineReducers} from '@reduxjs/toolkit';

import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer,
});
