import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Marker, Tooltip } from 'react-leaflet';

import { getReportIcon } from '../../utilities/utilities';

type TReportMarkers = {
  newReportCoordinates: { lat: number | null; lon: number | null };
};

const ReportMarkers: FC<TReportMarkers> = ({ newReportCoordinates }) => {
  const { t } = useTranslation();
  const { lat, lon } = newReportCoordinates || {};

  if (!lat || !lon) {
    return null;
  }

  return (
    <Marker position={[lat, lon]} icon={getReportIcon(99)} pane="shadowPane">
      <Tooltip direction="top" offset={[0, -55]}>
        {t('report.pinInfo')}
      </Tooltip>
    </Marker>
  );
};

export default ReportMarkers;
