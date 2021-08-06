import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationActions } from "../redux/actions/notificationActions";
import '../stylesheets/notification.scss';

function getModalStyle() {
    const top = 10;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        border: "2px solid #000",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));

const Notification = () => {

    const dispatch = useDispatch()
    const notification = useSelector((state) => state.notification);

    const [modalStyle] = React.useState(getModalStyle);

    const classes = useStyles();



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
    )
}

export default Notification;