import React from 'react';
import {Marker, Tooltip} from 'react-leaflet';
import {useTranslation} from 'react-i18next';

import {getReportIcon} from '../../utilities/utilities';

const ReportMarkers = ({newReportCoordinates}) => {
  const {t} = useTranslation();
  const {lat, lon} = newReportCoordinates || {};

  return (
    lat !== null &&
    lon !== null && (
      <Marker position={[lat, lon]} icon={getReportIcon(99)}>
        <Tooltip direction="top" offset={[0, -55]}>
          {t('report.pinInfo')}
        </Tooltip>
      </Marker>
    )
  );
};

export default ReportMarkers;
