import React from 'react';

import PropertyGridRow from './PropertyGridRow';

import '../stylesheets/propertyGrid.scss';

const PropertyGrid = ({propertyGrid}) => {
  const grid = propertyGrid;
  const entries = grid ? Object.entries(grid) : null;

  return (
    <div>
      <div className="propertyGrid-frame">
        {entries &&
          entries.map(([key, value]) =>
            key === 'tags' ? (
              value.map(({key, value}) => <PropertyGridRow title={key} value={value} />)
            ) : (
              <PropertyGridRow title={key} value={value} />
            ),
          )}
      </div>
    </div>
  );
};
export default PropertyGrid;
