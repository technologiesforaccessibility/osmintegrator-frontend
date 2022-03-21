import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import reducer from './reducers';

const store = configureStore({
  reducer,
});

export type TAppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<TAppDispatch>();

export default store;
