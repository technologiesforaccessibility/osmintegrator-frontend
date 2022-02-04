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
import TileExportModal from './TileExportModal';
import '../stylesheets/syncPanel.scss';

const SyncPanel: FC = () => {
  const {activeTile, setRerenderReports} = useContext(MapContext);
  const {setLoader} = useContext(UserContext);

  const [isOsmImportModalOpen, setIsOsmImportModalOpen] = useState<boolean>(false);
  const [isOsmExportModalOpen, setIsOsmExportModalOpen] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<string | null>(null);
  const [changes, setChanges] = useState<string>();
  const [tags, setTags] = useState<string[]>([]);
  const [comment, setComment] = useState<string>();
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

        setIsOsmImportModalOpen(true);
      } catch (error) {
        exception(error);
      } finally {
        setLoader(false);
      }
    }
  };

  const openExportModal = async () => {
    if (activeTile && activeTile.id) {
      try {
        setLoader(true);

        const tileExportInfo = await api.tilesExportChangesDetail(activeTile?.id, {headers: basicHeaders()});

        var tags = Object.keys(tileExportInfo.data.tags!)
          .filter(k => k !== 'comment')
          .map(key => `${key}=${tileExportInfo.data.tags![key]}`);

        setChanges(tileExportInfo.data.changes ?? '');
        setTags(tags);
        setComment(tileExportInfo.data.tags!['comment'] ?? '');

        setIsOsmExportModalOpen(true);
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
      <Button variant="contained" onClick={openExportModal} sx={{marginTop: '5px'}}>
        {t('sync.exportOSM')}
      </Button>
      <Button variant="contained" onClick={() => {}} disabled sx={{marginTop: '5px'}}>
        {t('sync.generateNotOsm')}
      </Button>

      {isOsmExportModalOpen && (
        <TileExportModal
          tileId={activeTile!.id}
          open={isOsmExportModalOpen}
          changes={changes}
          initialComment={comment}
          tags={tags}
          onClose={() => setIsOsmExportModalOpen(false)}
        />
      )}

      <Modal open={isOsmImportModalOpen}>
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
                setIsOsmImportModalOpen(false);
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
