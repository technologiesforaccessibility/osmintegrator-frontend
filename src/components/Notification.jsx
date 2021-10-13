import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Snackbar} from '@mui/material';
import {makeStyles} from '@mui/styles';

import {NotificationActions} from '../redux/actions/notificationActions';

const notificationBackgroundStyle = {
  Success: '#2db814',
  Warning: '#dda808',
  Error: '#b30000',
  Info: '#007acc',
};

const notificationShadowStyle = {
  Success: 'rgba(45, 184, 20, .3)',
  Warning: 'rgba(221, 168, 8, .3)',
  Error: 'rgba(179, 0, 0, .3)',
  Info: 'rgba(0, 122, 204, .3)',
};

const useStyles = makeStyles({
  root: {
    backgroundColor: notification => notificationBackgroundStyle[notification.title],
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: notification => `0 3px 5px 2px ${notificationShadowStyle[notification.title] || ''}`,
  },
});

const Notification = () => {
  const notification = useSelector(state => state.notification);
  const classes = useStyles(notification);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(NotificationActions.clear());
  };

  return (
    <Snackbar
      open={!!notification.message}
      autoHideDuration={6000}
      onClose={handleClose}
      ContentProps={{
        classes: {
          root: classes.root,
        },
      }}
      message={notification.message}
    />
  );
};

export default Notification;
