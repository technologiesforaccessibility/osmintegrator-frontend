import PropertyGridRow from './PropertyGridRow';

import '../stylesheets/propertyGrid.scss';
import {Button} from '@mui/material';
import {useContext} from 'react';
import {MapContext} from './contexts/MapContextProvider';

const PropertyGrid = ({propertyGrid}) => {
  const grid = propertyGrid;
  const entries = grid ? Object.entries(grid) : null;

  const {toogleMapMode} = useContext(MapContext);

  return (
    <>
      <Button variant="contained" onClick={() => toogleMapMode('Report')}>
        Edit reports
      </Button>
      <div className="propertyGrid-frame">
        {entries &&
          entries.map(([key, value]) =>
            key === 'tags' ? (
              value && value.map(({key, value}) => <PropertyGridRow key={key} title={key} value={value} />)
            ) : key === 'messages' ? null : (
              <PropertyGridRow key={key} title={key} value={value} />
            ),
          )}
      </div>
    </>
  );
};
export default PropertyGrid;
