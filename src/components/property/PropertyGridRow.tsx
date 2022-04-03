import React, { FC } from 'react';

type TPropertyGridRowProps = {
  title: string | undefined | null;
  value: boolean | null | Record<string, unknown> | string | undefined;
};

const PropertyGridRow: FC<TPropertyGridRowProps> = ({ title, value }) => {
  return (
    <div className="propertyGrid-row">
      <div className="propertyGrid-key">{title}</div>
      <div className="propertyGrid-value">
        {typeof value === 'boolean' || value === null ? JSON.stringify(value) : value}
      </div>
    </div>
  );
};

export default PropertyGridRow;
