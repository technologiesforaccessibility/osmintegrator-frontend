export const NotificationType = {
    SUCCESS: 1,
    WARNING: 2,
    ERROR: 3,
    CLEAR: 0
};


export const NotificationActions = {
    success,
    warning,
    error,
    clear
};

function success(message) {
    return { type: NotificationType.SUCCESS, message };
}

function error(message) {
    return { type: NotificationType.ERROR, message };
}

function warning(message) {
    return { type: NotificationType.WARNING, message };
}

function clear() {
    return {type: NotificationType.CLEAR}
}