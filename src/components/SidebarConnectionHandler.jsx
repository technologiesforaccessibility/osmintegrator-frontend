import {useContext, useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import api from '../api/apiInstance';
import {generateConnectionData, getPosition} from '../utilities/mapUtilities';
import {basicHeaders} from '../config/apiConfig';
import {MapContext} from './contexts/MapContextProvider';
import ConnectionActionConfirmation from './ConnectionActionConfirmation';
import {NotificationActions} from '../redux/actions/notificationActions';
import {selectLoggedInUserRoles} from './../redux/selectors/authSelector';
import {exception} from '../utilities/exceptionHelper';
import {roles} from '../utilities/constants';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const connectionActions = {
  delete: 'Delete',
  approve: 'Approve',
};

const SidebarConnectionHandler = () => {
  const {connectedStopPair, shouldRenderConnections, setIsSidebarConnectionHandlerVisible, setConnectedStopPair} =
    useContext(MapContext);
  const [open, setOpen] = useState(false);
  const [connectionAction, setConnectionAction] = useState(null);
  // const handleOpen = () => setOpen(true);
  const authRoles = useSelector(selectLoggedInUserRoles);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const checkStopType = stopList => {
    return stopList.map(stop => {
      return {...stop, isOsm: stop.stopType === 0};
    });
  };

  const deleteConnection = async () => {
    console.log('GENERATE', generateConnectionData([connectedStopPair.markedStop, connectedStopPair.connectedStop]));
    try {
      await api.connectionsDelete(
        generateConnectionData([connectedStopPair.markedStop, connectedStopPair.connectedStop]),
        {
          headers: basicHeaders(),
        },
      );
      shouldRenderConnections(true);
      setIsSidebarConnectionHandlerVisible(false);
      console.log('BEFORE');
      setConnectedStopPair({markedStop: null, connectedStop: null});
      console.log('AFTER');
      dispatch(NotificationActions.success(t('connection.deleteSuccessMessage')));
    } catch (error) {
      exception(error);
    }
  };

  const approveConnection = async id => {
    try {
      await api.connectionsApproveUpdate(id, {
        headers: basicHeaders(),
      });
      shouldRenderConnections(true);
      dispatch(NotificationActions.success(t('connection.approveSuccessMessage')));
    } catch (error) {
      exception(error);
    }
  };

  const unapproveConnection = async id => {
    try {
      await api.connectionsUnapproveUpdate(id, {
        headers: basicHeaders(),
      });
      shouldRenderConnections(true);
      dispatch(NotificationActions.success(t('connection.unapproveSuccessMessage')));
    } catch (error) {
      exception(error);
    }
  };

  return (
    <>
      <div>
        Przystanek:{' '}
        <span style={{fontWeight: 'bold'}}>{connectedStopPair.markedStop.name || 'Brak nazwy przystanku'}</span>
      </div>
      <div>
        Połączony z:{' '}
        <span style={{fontWeight: 'bold'}}>{connectedStopPair.connectedStop.name || 'Brak nazwy przystanku'}</span>
      </div>
      <Button
        onClick={() => {
          deleteConnection();
          // setConnectionAction(connectionActions.delete);
          // setOpen(true);
        }}>
        Usuń połączenie
      </Button>
      {authRoles.includes(roles.SUPERVISOR) && (
        <Button
          onClick={() => {
            // setOpen(true);
            // setConnectionAction(connectionActions.approve);
          }}>
          Zatwierdź połączenie
        </Button>
      )}

      <Modal
        open={open && connectionAction}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <ConnectionActionConfirmation />
        </Box>
      </Modal>
    </>

    // Approve connection when supervisor
    // Delete connection when supervisor or editor
  );
};

export default SidebarConnectionHandler;
