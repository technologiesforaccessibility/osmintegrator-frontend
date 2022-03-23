import { createAction } from '@reduxjs/toolkit';

export const NotificationType = {
  SUCCESS: 1,
  WARNING: 2,
  ERROR: 3,
  CLEAR: 0,
};

const payload = (message: string) => {
  return {
    payload: { message: message },
  };
};

export const NotificationActions = {
  success: createAction(NotificationType.SUCCESS.toString(), payload),
  warning: createAction(NotificationType.WARNING.toString(), payload),
  error: createAction(NotificationType.ERROR.toString(), payload),
  clear: createAction(NotificationType.CLEAR.toString()),
};
