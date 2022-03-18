import { createReducer } from '@reduxjs/toolkit';
import { NotificationActions } from '../actions/notificationActions';

export type TNotificationState = {
  title?: string;
  class?: string;
  message?: string;
};

const initialState: TNotificationState = {
  title: undefined,
  class: undefined,
  message: undefined,
};

export const NotificationReducer = createReducer(initialState, builder => {
  builder
    .addCase(NotificationActions.success, (state, action) => {
      state.class = 'success-modal';
      state.title = 'Success';
      state.message = action.payload.message;
    })
    .addCase(NotificationActions.warning, (state, action) => {
      state.class = 'warning-modal';
      state.title = 'Warning';
      state.message = action.payload.message;
    })
    .addCase(NotificationActions.error, (state, action) => {
      state.class = 'error-modal';
      state.title = 'Error';
      state.message = action.payload.message;
    })
    .addCase(NotificationActions.clear, state => {
      state.class = undefined;
      state.title = undefined;
      state.message = undefined;
    });
});
