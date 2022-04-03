import './propertyGrid.scss';

import { Button } from '@mui/material';
import { Conversation, Stop, Tag } from 'api/apiClient';
import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { MapContext } from '../../contexts/MapContextProvider';
import PropertyGridRow from '../PropertyGridRow';

type TViewPanelProps = {
  propertyGrid: Stop | Conversation;
};

// HACK: This is an old code. It needs to be replaced with a proper way of displaying stop details.
const ViewPanel: FC<TViewPanelProps> = ({ propertyGrid }) => {
  const stop = propertyGrid as Stop;
  const entries = stop ? Object.entries(stop) : null;
  const { t } = useTranslation();

  const { toggleMapMode } = useContext(MapContext);

  return (
    <>
      <Button fullWidth variant="contained" onClick={() => toggleMapMode('Report')} sx={{ marginBottom: '1rem' }}>
        {t('report.edit')}
      </Button>
      <div className="propertyGrid-frame">
        {entries &&
          entries.map(([key, value]) =>
            key === 'messages' || key === 'tags' ? null : <PropertyGridRow key={key} title={key} value={value} />,
          )}
      </div>
      <p className="tile-details__title">{t('viewMode.tagsTitle')}</p>
      <div className="propertyGrid-frame">
        {stop &&
          stop?.tags &&
          stop?.tags.map((value: Tag) => <PropertyGridRow key={value.key} title={value.key} value={value.value} />)}
      </div>
    </>
  );
};
export default ViewPanel;
