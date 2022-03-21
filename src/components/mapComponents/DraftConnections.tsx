import React, { FC, Fragment } from 'react';
import { Polyline } from 'react-leaflet';
import { Stop } from '../../api/apiClient';

import colors from '../../stylesheets/config/colors.module.scss';

type TDraftConnectionsProps = {
  connections: Stop[];
  isTileActive: boolean;
};

const DraftConnections: FC<TDraftConnectionsProps> = ({ connections, isTileActive }) => {
  return (
    <Fragment>
      {isTileActive && connections.length === 2 && (
        <Polyline
          pathOptions={{ color: colors.colorConnectionDraft }}
          positions={[
            [connections[0].lat ?? 0, connections[0].lon ?? 0],
            [connections[1].lat ?? 0, connections[1].lon ?? 0],
          ]}
        />
      )}
    </Fragment>
  );
};

export default DraftConnections;
