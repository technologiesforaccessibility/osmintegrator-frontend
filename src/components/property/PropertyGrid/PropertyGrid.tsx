import './propertyGrid.scss';

import { Button } from '@mui/material';
import { Conversation, Stop } from 'api/apiClient';
import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { MapContext } from '../../contexts/MapContextProvider';
import PropertyGridRow from '../PropertyGridRow';

type TPropertyGridProps = {
  propertyGrid: Stop | Conversation;
};

const PropertyGrid: FC<TPropertyGridProps> = ({ propertyGrid }) => {
  const grid = propertyGrid;
  const entries = grid ? Object.entries(grid) : null;
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
            key === 'tags' ? (
              value &&
              value.map(({ innerKey, innerValue }: any) => (
                <PropertyGridRow key={innerKey} title={innerKey} value={innerValue} />
              ))
            ) : key === 'messages' ? null : (
              <PropertyGridRow key={key} title={key} value={value} />
            ),
          )}
      </div>
    </>
  );
};
export default PropertyGrid;
