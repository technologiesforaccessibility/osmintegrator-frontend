import {FC, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import Button from '@mui/material/Button';

import {MapContext} from './contexts/MapContextProvider';
import '../stylesheets/syncPanel.scss';

const SyncPanel: FC = () => {
  const {activeTile} = useContext(MapContext);
  const {t} = useTranslation();

  return (
    <div className="sync__button-container">
      <Button className="sync_button" variant="contained" onClick={() => {}} sx={{marginTop: '5px'}}>
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
    </div>
  );
};

export default SyncPanel;
