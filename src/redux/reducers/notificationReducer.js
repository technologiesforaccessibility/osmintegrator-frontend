import { NotificationType } from "../actions/notificationActions";
const initialState = {};

export const NotificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case NotificationType.SUCCESS:
            return {
                title:'Success',
                class: 'success-modal',
                message: action.message
            };
        case NotificationType.WARNING:
            return {
                title: 'Warning',
                class: 'warning-modal',
                message: action.message
            };
        case NotificationType.ERROR:
            return {
                title: 'Error',
                class: 'error-modal',
                message: action.message
            };
        case NotificationType.CLEAR:
            return {};
        default:
            return state;
    }
}