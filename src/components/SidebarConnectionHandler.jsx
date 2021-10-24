import {useContext, useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import {MapContext} from './contexts/MapContextProvider';
import ConnectionActionConfirmation from './ConnectionActionConfirmation';

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
  const {connectedStopPair} = useContext(MapContext);
  const [open, setOpen] = useState(false);
  const [connectionAction, setConnectionAction] = useState(null);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div>Przystanek: <span style={{fontWeight: 'bold'}}>{connectedStopPair.markedStop.name || 'Brak nazwy przystanku'}</span></div>
      <div>Połączony z: <span style={{fontWeight: 'bold'}}>{connectedStopPair.connectedStop.name || 'Brak nazwy przystanku'}</span></div>
      <Button
        onClick={() => {
          setConnectionAction(connectionActions.delete);
          setOpen(true);
        }}>
        Usuń połączenie
      </Button>
      <Button
        onClick={() => {
          setOpen(true);
          setConnectionAction(connectionActions.approve);
        }}>
        Zatwierdź połączenie
      </Button>
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
