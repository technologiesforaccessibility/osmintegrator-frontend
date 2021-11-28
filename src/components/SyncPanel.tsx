import {FC, useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/system/Box';
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch} from 'react-redux';

import api from '../api/apiInstance';
import {basicHeaders} from '../config/apiConfig';
import {MapContext} from './contexts/MapContextProvider';
import {exception} from '../utilities/exceptionHelper';
import {NotificationActions} from '../redux/actions/notificationActions';

import '../stylesheets/syncPanel.scss';

const SyncPanel: FC = () => {
  const {activeTile, setRerenderReports} = useContext(MapContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<any>(null);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const handleImportOSM = async () => {
    if (activeTile && activeTile.id) {
      try {
        await api.tileUpdateStopsUpdate(activeTile?.id, {headers: basicHeaders()});
        dispatch(NotificationActions.success(t('report.success')));
        setRerenderReports(true);
        // setUpdateData(response.data.message.toString());
        // setIsModalOpen(true);
      } catch (error) {
        exception(error);
      }
    }
  };

  return (
    <div className="sync__button-container">
      <Button className="sync_button" variant="contained" onClick={handleImportOSM} sx={{marginTop: '5px'}}>
        {t('sync.importOSM')}
      </Button>
      <Button variant="contained" onClick={() => {}} disabled sx={{marginTop: '5px'}}>
        {t('sync.importNotOSM')}
      </Button>
      <Button variant="contained" onClick={() => {}} disabled sx={{marginTop: '5px'}}>
        {t('sync.exportOSM')}
      </Button>
      <Button variant="contained" onClick={() => {}} disabled sx={{marginTop: '5px'}}>
        {t('sync.generateNotOsm')}
      </Button>

      <Modal open={isModalOpen}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'white',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}>
          <div>
            <p>Zaktualizowano przystanki</p>
            <p>Poniżej lista zmian</p>
            <Button
              onClick={() => {
                setIsModalOpen(false);
                setUpdateData(null);
              }}
              variant="outlined">
              <CloseIcon color="primary" />
            </Button>
          </div>
          <div style={{overflowY: 'scroll'}}>{updateData ? updateData : null}</div>
        </Box>
      </Modal>
    </div>
  );
};

export default SyncPanel;
