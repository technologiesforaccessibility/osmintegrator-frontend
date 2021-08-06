import Modal from '@material-ui/core/Modal';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationActions } from '../redux/actions/notificationActions';
import '../stylesheets/notification.scss';

const Notification = () => {

    const dispatch = useDispatch();
    const notification = useSelector((state) => state.notification);

    const handleClose = () => {
        dispatch(NotificationActions.clear());
    };

    const body = (
        <div className={'modal-layout ' + notification.class}>
            <h2 id="simple-modal-title">{ notification.title }</h2>
            <p id="simple-modal-description">
                {notification.message} {}
            </p>
        </div>
    );

    return (
        <Modal
            open={!!notification.message}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    );
};

export default Notification;