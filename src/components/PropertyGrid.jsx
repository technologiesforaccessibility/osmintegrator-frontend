import React from 'react';

import PropertyGridRow from './PropertyGridRow';

import '../stylesheets/propertyGrid.scss';

const PropertyGrid = ({propertyGrid}) => {
  const grid = propertyGrid;
  const entries = grid ? Object.entries(grid) : null;

  return (
      <div className="propertyGrid-frame">
        {entries &&
          entries.map(([key, value]) =>
            key === 'tags' ? (
              value && value.map(({key, value}) => <PropertyGridRow key={key} title={key} value={value} />)
            ) : (
              <PropertyGridRow key={key} title={key} value={value} />
            ),
          )}
      </div>
  );
};
export default PropertyGrid;
