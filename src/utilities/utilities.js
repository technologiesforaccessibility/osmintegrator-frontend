import { Icon } from 'leaflet';

import reportBlueIcon from '../assets/report_blue.png';
import reportGreenIcon from '../assets/report_green.png';
import reportGrayIcon from '../assets/report_gray.png';

import gtfsStopIcon from '../assets/angledIcons/gtfs_stop.png';
import gtfsStopReportIcon from '../assets/angledIcons/gtfs_stop_report.png';
import gtfsStopReportApprovedIcon from '../assets/angledIcons/gtfs_stop_report_approved.png';

import osmStopIcon from '../assets/angledIcons/osm_stop.png';
import osmStopReportIcon from '../assets/angledIcons/osm_stop_report.png';
import osmStopReportApprovedIcon from '../assets/angledIcons/osm_stop_report_approved.png';

import osmStopOutsideIcon from '../assets/angledIcons/osm_stop-out.png';
import osmStopReportOutsideIcon from '../assets/angledIcons/osm_stop_report-out.png';
import osmStopReportApprovedOutsideIcon from '../assets/angledIcons/osm_stop_report_approved-out.png';

import shadowZTM from '../assets/angledIcons/shadow_ztm.png';
import shadowOSM from '../assets/angledIcons/shadow_osm.png';
import shadowReport from '../assets/report_frame.png';
import { StopType } from '../types/enums';

export const reportIcons = {
  initial: reportGrayIcon,
  created: reportBlueIcon,
  approved: reportGreenIcon,
};

const stopIcons = {
  gtfsStop: gtfsStopIcon,
  gtfsStopReport: gtfsStopReportIcon,
  gtfsStopReportApproved: gtfsStopReportApprovedIcon,

  osmStop: osmStopIcon,
  osmStopReport: osmStopReportIcon,
  osmStopReportApproved: osmStopReportApprovedIcon,

  osmStopOutside: osmStopOutsideIcon,
  osmStopReportOutside: osmStopReportOutsideIcon,
  osmStopReportApprovedOutside: osmStopReportApprovedOutsideIcon,
};

const comparePasswords = (pass1, pass2) => {
  return pass1 === pass2;
};

const isPasswordStrong = password => {
  const pattern = /^\S{8,}$/g;
  return password.match(pattern);
};

const getTokenFromPath = urlString => {
  try {
    const url = new URL(urlString);
    const rawToken = url.searchParams.get('token');
    return rawToken.split(' ').join('+');
  } catch (err) {
    return err.message;
  }
};

const getEmailFromPath = urlString => {
  try {
    const url = new URL(urlString);
    return url.searchParams.get('email');
  } catch (err) {
    return err.message;
  }
};

const getBusStopIcon = (busStopProperties, isActive) => {
  const iconProps = getStopIconProps(busStopProperties);
  const { iconUrl, iconAnchor } = iconProps;
  const shadowProps = getShadowProps(busStopProperties);
  const { shadowUrl, shadowAnchor } = shadowProps;

  const activeIcon = new Icon({
    iconUrl,
    iconSize: [30, 55],
    iconAnchor,
    shadowUrl,
    shadowAnchor,
    shadowSize: [36, 63],
  });
  const inActiveIcon = new Icon({
    iconUrl,
    iconSize: [30, 55],
    iconAnchor,
  });
  return isActive ? activeIcon : inActiveIcon;
};

const getReportIcon = (status, isActive) => {
  const activeIcon = new Icon({
    iconUrl: getReportColor(status),
    iconSize: [30, 55],
    iconAnchor: [15, 54],
    shadowUrl: shadowReport,
    shadowAnchor: [18, 57],
    shadowSize: [36, 63],
  });
  const inActiveIcon = new Icon({
    iconUrl: getReportColor(status),
    iconSize: [30, 55],
    iconAnchor: [15, 54],
  });

  return isActive ? activeIcon : inActiveIcon;
};

const unsafeApiError = (errorInstance, optionalUserMessage) => {
  if (errorInstance.status === 401) {
    console.log('Authorization problem');
  }
  if (optionalUserMessage) {
    console.log(optionalUserMessage);
  } else {
    console.log('Unknown problem');
  }
};

const unsafeFormApiError = (error, translate, option) => {
  if (error.status === 401) {
    return translate(`${option}.401`);
  }
  if (error.status === 400) {
    return translate(400);
  } else {
    return translate('unrecognizedProblem');
  }
};

export {
  unsafeApiError,
  comparePasswords,
  getTokenFromPath,
  getEmailFromPath,
  isPasswordStrong,
  getBusStopIcon,
  unsafeFormApiError,
  getReportIcon,
};

const getStopIconProps = ({ outsideSelectedTile, stopType, hasReport, reportApproved }) => {
  if (outsideSelectedTile) {
    // OSM outside a tile
    if (stopType === StopType.OSM) {
      if (reportApproved) {
        return { iconUrl: stopIcons.osmStopReportApprovedOutside, iconAnchor: [30, 55] };
      }
      if (hasReport) {
        return { iconUrl: stopIcons.osmStopReportOutside, iconAnchor: [30, 55] };
      }
      return { iconUrl: stopIcons.osmStopOutside, iconAnchor: [30, 55] };
    }
  }
  // OSM inside a tile
  if (stopType === StopType.OSM) {
    if (reportApproved) {
      return { iconUrl: stopIcons.osmStopReportApproved, iconAnchor: [30, 55] };
    }
    if (hasReport) {
      return { iconUrl: stopIcons.osmStopReport, iconAnchor: [30, 55] };
    }
    return { iconUrl: stopIcons.osmStop, iconAnchor: [30, 55] };
  }
  // GTFS inside a tile
  if (reportApproved) {
    return { iconUrl: stopIcons.gtfsStopReportApproved, iconAnchor: [0, 55] };
  }
  if (hasReport) {
    return { iconUrl: stopIcons.gtfsStopReport, iconAnchor: [0, 55] };
  }
  return { iconUrl: stopIcons.gtfsStop, iconAnchor: [0, 55] };
};

const getShadowProps = ({ stopType }) => {
  return stopType === StopType.OSM
    ? { shadowUrl: shadowZTM, shadowAnchor: [34, 58] }
    : { shadowUrl: shadowOSM, shadowAnchor: [3, 58] };
};

const getReportColor = status => {
  switch (status) {
    case 0:
      return reportIcons.created;
    case 1:
      return reportIcons.approved;
    default:
      // 99
      return reportIcons.initial;
  }
};
