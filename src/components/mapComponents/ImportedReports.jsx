import React from 'react';
import {Marker, Tooltip} from 'react-leaflet';

import {getReportIcon} from '../../utilities/utilities';

const ImportedReports = ({reports}) => {
  return (
    <>
      {reports.map(({lat, lon, text}) => (
        <Marker position={[lat, lon]} icon={getReportIcon()}>
          <Tooltip direction="top" offset={[0, -55]}>
            {text}
          </Tooltip>
        </Marker>
      ))}
    </>
  );
};

export default ImportedReports;
