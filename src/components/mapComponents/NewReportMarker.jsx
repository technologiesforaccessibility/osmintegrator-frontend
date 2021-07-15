import React from 'react';
import {Marker} from 'react-leaflet';
import {getReportIcon} from '../../utilities/utilities';

const ReportMarkers = ({newReportCoordinates}) => {
  const {lat, lon} = newReportCoordinates || {};
  return lat !== null && lon !== null && <Marker position={[lat, lon]} icon={getReportIcon()} />;
};

export default ReportMarkers;
