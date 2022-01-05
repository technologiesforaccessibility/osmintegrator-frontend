import React, {FC, useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/system/Box';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import {useDispatch} from 'react-redux';

import api from '../api/apiInstance';
import {basicHeaders} from '../config/apiConfig';
import {MapContext} from './contexts/MapContextProvider';
import {exception} from '../utilities/exceptionHelper';
import {NotificationActions} from '../redux/actions/notificationActions';
import {UserContext} from './contexts/UserContextProvider';

import '../stylesheets/syncPanel.scss';

const SyncPanel: FC = () => {
  const {activeTile, setRerenderReports} = useContext(MapContext);
  const {setLoader} = useContext(UserContext);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<string | null>(null);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const handleImportOSM = async () => {
    if (activeTile && activeTile.id) {
      try {
        setLoader(true);
        const response = await api.tileUpdateStopsUpdate(activeTile?.id, {headers: basicHeaders()});
        dispatch(NotificationActions.success(t('report.success')));
        setRerenderReports(true);
        const {value}: {value?: string | null} = response.data || {};
        setUpdateData(value || null);

        setIsModalOpen(true);
      } catch (error) {
        exception(error);
      } finally {
        setLoader(false);
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
            width: 800,
            bgcolor: 'white',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}>
          <div>
            <h4>{t('sync.stopsUpdated')}</h4>
            {updateData ? (
              <TextField
                id="outlined-multiline-static"
                label={null}
                multiline
                rows={20}
                defaultValue={updateData}
                sx={{
                  width: '100%',
                  margin: '0px 5px',
                  bgcolor: 'white',
                }}
                disabled={true}
              />
            ) : (
              <p>{t('sync.noChanges')}</p>
            )}

            <Button
              onClick={() => {
                setIsModalOpen(false);
                setUpdateData(null);
              }}
              style={{position: 'absolute', top: '20px', right: '20px'}}
              variant="outlined">
              <CloseIcon color="primary" />
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SyncPanel;
