import PropertyGridRow from './PropertyGridRow';

import '../stylesheets/propertyGrid.scss';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { MapContext } from './contexts/MapContextProvider';
import { useTranslation } from 'react-i18next';

const PropertyGrid = ({ propertyGrid }) => {
  const grid = propertyGrid;
  const entries = grid ? Object.entries(grid) : null;
  const { t } = useTranslation();

  const { toogleMapMode } = useContext(MapContext);

  return (
    <>
      <Button fullWidth variant="contained" onClick={() => toogleMapMode('Report')} sx={{ marginBottom: '1rem' }}>
        {t('report.edit')}
      </Button>
      <div className="propertyGrid-frame">
        {entries &&
          entries.map(([key, value]) =>
            key === 'tags' ? (
              value &&
              value.map(({ innerKey, innerValue }) => (
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
