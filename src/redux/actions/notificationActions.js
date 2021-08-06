import { createAction } from '@reduxjs/toolkit';

export const NotificationType = {
    SUCCESS: 1,
    WARNING: 2,
    ERROR: 3,
    CLEAR: 0
};

const payload = (message) => {
    return {
        payload: { message: message }
    };
};

export const NotificationActions = {
    success: createAction(NotificationType.SUCCESS, payload),
    warning: createAction(NotificationType.WARNING, payload),
    error: createAction(NotificationType.ERROR, payload),
    clear: createAction(NotificationType.CLEAR)
};