import {Button} from '@mui/material';
import {ChangeEvent, FC, useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import api from '../../api/apiInstance';
import {noContentTypeHeaders} from '../../config/apiConfig';
import {exception} from '../../utilities/exceptionHelper';
import {UserContext} from '../contexts/UserContextProvider';
import ReportsModal from '../ReportsModal';
import '../../stylesheets/stopsImportPanel.scss';

const ManagementPanelStops: FC = () => {
  const {t} = useTranslation();
  const {setLoader} = useContext(UserContext);
  const [importData, setImportData] = useState<string | null>();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleImportGtfs = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setLoader(true);
      if (!event?.target?.files?.length) {
        return;
      }

      const response = await api.updateGtfsStops({file: event.target.files[0]}, {headers: noContentTypeHeaders()});
      const {value}: {value?: string | null} = response.data || {};
      setImportData(value || null);
      setModalOpen(true);
    } catch (error) {
      exception(error);
    } finally {
      setLoader(false);
      const input = document.querySelector('input[name="gtfs_import"]');
      if (input) (input as HTMLInputElement).value = '';
    }
  };

  const handleInputClick = () => {
    const input = document.querySelector('input[name="gtfs_import"]');
    if (input) (input as HTMLElement).click();
  };

  return (
    <div className="stops-importPanel mt-3">
      <input
        type="file"
        name="gtfs_import"
        onChange={handleImportGtfs}
        style={{width: 0, height: 0, visibility: 'hidden'}}
      />
      <Button variant="contained" onClick={handleInputClick} sx={{display: 'flex', width: '100%'}}>
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
