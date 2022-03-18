import React, { Fragment } from 'react';
import { Polyline } from 'react-leaflet';

import colors from '../../stylesheets/config/colors.module.scss';

const DraftConnections = ({ connections, isTileActive }) => {
  return (
    <Fragment>
      {isTileActive && connections.length === 2 && (
        <Polyline
          pathOptions={{ color: colors.colorConnectionDraft }}
          positions={[
            [connections[0].lat, connections[0].lon],
            [connections[1].lat, connections[1].lon],
          ]}
        />
      )}
    </Fragment>
  );
};

export default DraftConnections;
