import { Snackbar, SnackbarContent } from '@mui/material';
import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NotificationActions } from '../redux/actions/notificationActions';

interface NotificationObject {
  class: 'success-modal' | 'warning-modal' | 'error-modal' | undefined;
  title: 'Success' | 'Warning' | 'Error' | undefined;
  message: String | undefined;
}

const notificationBackgroundStyle = (n: NotificationObject) => {
  switch (n.title) {
    case 'Success':
      return '#2db814';
    case 'Warning':
      return '#dda808';
    case 'Error':
      return '#b30000';
    default:
      return '#007acc';
  }
};

const notificationShadowStyle = (n: NotificationObject) => {
  switch (n.title) {
    case 'Success':
      return 'rgba(45, 184, 20, .3)';
    case 'Warning':
      return 'rgba(221, 168, 8, .3)';
    case 'Error':
      return 'rgba(179, 0, 0, .3)';
    default:
      return 'rgba(0, 122, 204, .3)';
  }
};

const Notification: FC = () => {
  const notification = useSelector((state: { notification: NotificationObject }) => state.notification);

  const dispatch = useDispatch();

  const handleClose = () => {
    // after onClose is called, snackbar is visible during "fade-out" phase
    setTimeout(() => dispatch(NotificationActions.clear()), 1500);
  };

  const style = useMemo(
    () => ({
      snackbar: {
        backgroundColor: notificationBackgroundStyle(notification),
        borderRadius: 3,
        border: 0,
        boxShadow: `0 3px 5px 2px ${notificationShadowStyle(notification) || ''}`,
      },
      content: {
        backgroundColor: notificationBackgroundStyle(notification),
        color: 'white',
        padding: '0 2rem',
      },
    }),
    [notification],
  );

  return (
    <Snackbar
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      open={!!notification.message}
      autoHideDuration={6000}
      onClose={handleClose}
      sx={style.snackbar}>
      <SnackbarContent sx={style.content} message={notification.message} />
    </Snackbar>
  );
};

export default Notification;
