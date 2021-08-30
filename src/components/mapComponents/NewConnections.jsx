import React, {Fragment} from 'react';
import {Polyline} from 'react-leaflet';

import colors from '../../stylesheets/config/colors.module.scss';

const NewConnections = ({connections, isTileActive}) => {
  return (
    <Fragment>
      {isTileActive && connections.length === 2 && (
        <Polyline
          pathOptions={{color: colors.colorConnectionNew}}
          positions={[connections[0].coordinates, connections[1].coordinates]}
        />
      )}
    </Fragment>
  );
};

export default NewConnections;
