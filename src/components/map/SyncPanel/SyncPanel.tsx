import './syncPanel.scss';

import Button from '@mui/material/Button';
import api from 'api/apiInstance';
import { basicHeaders } from 'config/apiConfig';
import React, { FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { NotificationActions } from 'redux/actions/notificationActions';
import { exception } from 'utilities/exceptionHelper';

import { MapContext } from '../../contexts/MapContextProvider';
import { UserContext } from '../../contexts/UserContextProvider';
import ReportsModal from '../../reports/ReportsModal';
import TileExportModal from '../../tiles/TileExportModal';

const SyncPanel: FC = () => {
  const { activeTile, setRerenderReports, setRerenderConnections } = useContext(MapContext);
  const { setLoader } = useContext(UserContext);

  const [isOsmImportModalOpen, setIsOsmImportModalOpen] = useState<boolean>(false);
  const [isOsmExportModalOpen, setIsOsmExportModalOpen] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<string | null>(null);
  const [changes, setChanges] = useState<string>();
  const [tags, setTags] = useState<string[]>([]);
  const [comment, setComment] = useState<string>();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleImportOSM = async () => {
    if (activeTile && activeTile.id) {
      try {
        setLoader(true);
        const response = await api.tileUpdateStopsUpdate(activeTile?.id, { headers: basicHeaders() });
        dispatch(NotificationActions.success(t('report.success')));
        setRerenderReports(true);
        const { value }: { value?: string | null } = response.data || {};
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

        const tileExportInfo = await api.tilesExportChangesDetail(activeTile?.id, { headers: basicHeaders() });

        const remappedTags = Object.keys(tileExportInfo.data.tags!)
          .filter(k => k !== 'comment')
          .map(key => `${key}=${tileExportInfo.data.tags![key]}`);

        setChanges(tileExportInfo.data.changes ?? '');
        setTags(remappedTags);
        setComment(tileExportInfo.data.tags!.comment ?? '');

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
      <Button className="sync_button" variant="contained" onClick={handleImportOSM} sx={{ marginTop: '5px' }}>
        {t('sync.importOSM')}
      </Button>
      <Button variant="contained" onClick={openExportModal} sx={{ marginTop: '5px' }}>
        {t('sync.exportOSM')}
      </Button>
      <Button variant="contained" onClick={() => {}} disabled sx={{ marginTop: '5px' }}>
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

      <ReportsModal
        isOpen={isOsmImportModalOpen}
        data={updateData ?? ''}
        onClose={() => {
          setRerenderConnections(true);
          setIsOsmImportModalOpen(false);
          setUpdateData(null);
        }}
      />
    </div>
  );
};

export default SyncPanel;
