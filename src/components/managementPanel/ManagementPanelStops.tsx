import './stopsImportPanel.scss';

import { Button } from '@mui/material';
import api from 'api/apiInstance';
import { noContentTypeHeaders } from 'config/apiConfig';
import { ChangeEvent, FC, useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { exception } from 'utilities/exceptionHelper';

import { UserContext } from '../contexts/UserContextProvider';
import ReportsModal from '../reports/ReportsModal';

const ManagementPanelStops: FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const { setLoader } = useContext(UserContext);
  const [importData, setImportData] = useState<string | null>();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleImportGtfs = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setLoader(true);
      if (!event?.target?.files?.length) {
        return;
      }

      const response = await api.gtfsUpdateStopsUpdate(
        { file: event.target.files[0] },
        { headers: noContentTypeHeaders() },
      );
      const { value }: { value?: string | null } = response.data || {};
      setImportData(value || null);
      setModalOpen(true);
    } catch (error) {
      exception(error);
    } finally {
      setLoader(false);
      const input = fileInputRef.current;
      if (input) (input as HTMLInputElement).value = '';
    }
  };

  const handleInputClick = () => {
    const input = fileInputRef.current;
    if (input) (input as HTMLElement).click();
  };

  return (
    <div className="stops-importPanel mt-3">
      <input
        ref={fileInputRef}
        type="file"
        name="gtfs_import"
        onChange={handleImportGtfs}
        style={{ width: 0, height: 0, visibility: 'hidden' }}
      />
      <Button variant="contained" onClick={handleInputClick} sx={{ display: 'flex', width: '100%' }}>
        {t('sync.importNotOSM')}
      </Button>

      <ReportsModal
        isOpen={isModalOpen}
        data={importData ?? ''}
        onClose={() => {
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default ManagementPanelStops;
