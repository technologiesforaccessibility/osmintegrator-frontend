import {Icon} from 'leaflet';

import reporBlackIcon from '../assets/report_black.png';
import reportBlueIcon from '../assets/report_blue.png';
import reportGreenIcon from '../assets/report_green.png';
import reportRedIcon from '../assets/report_red.png';
import reportGreyIcon from '../assets/report_grey.png';

import angledBlackIcon from '../assets/angledIcons/angled_black.png';
import angledGreykIcon from '../assets/angledIcons/angled_grey.png';
import angledPinkIcon from '../assets/angledIcons/angled_pink.png';
import angledMaroonIcon from '../assets/angledIcons/angled_maroon.png';
import reportBlackIcon from '../assets/angledIcons/report_black.png';
import reportPinkIcon from '../assets/angledIcons/report_pink.png';
import reportMaroonIcon from '../assets/angledIcons/report_maroon.png';
import reportApproveBlackIcon from '../assets/angledIcons/report_black_approve.png';
import reportApprovePinkIcon from '../assets/angledIcons/report_pink_approve.png';
import reportApproveMaroonIcon from '../assets/angledIcons/report_maroon_approve.png';
import shadowZTM from '../assets/angledIcons/shadow_ztm.png';
import shadowOSM from '../assets/angledIcons/shadow_osm.png';
import shadowReport from '../assets/report_frame.png';
import {StopType} from '../types/enums';

export const reportIcons = {
  initial: reportGreyIcon,
  created: reportBlueIcon,
  approved: reportGreenIcon,
  rejected: reportRedIcon,
  unexpected: reporBlackIcon,
};

const stopIcons = {
  osmInside: angledBlackIcon,
  osmOutside: angledGreykIcon,
  osmReport: reportBlackIcon,
  osmReportApprove: reportApproveBlackIcon,
  notOsmInside: angledPinkIcon,
  notOsmOutside: angledMaroonIcon,
  notOsmReportInside: reportPinkIcon,
  notOsmReportOutside: reportMaroonIcon,
  notOsmReportInsideApprove: reportApprovePinkIcon,
  notOsmReportOutsideApprove: reportApproveMaroonIcon,
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

const getBusStopIcon = (busStopPropeties, isActive) => {
  const iconProps = getStopIconProps(busStopPropeties);
  const {iconUrl, iconAnchor} = iconProps;
  const shadowProps = getShadowProps(busStopPropeties);
  const {shadowUrl, shadowAnchor} = shadowProps;

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

const getStopIconProps = ({outsideSelectedTile, stopType, hasReport, reportApproved}) => {
  return outsideSelectedTile
    ? stopType === StopType.OSM
      ? {iconUrl: stopIcons.osmOutside, iconAnchor: [30, 55]}
      : hasReport
      ? reportApproved
        ? {iconUrl: stopIcons.notOsmReportOutsideApprove, iconAnchor: [0, 55]}
        : {iconUrl: stopIcons.notOsmReportOutside, iconAnchor: [0, 55]}
      : {iconUrl: stopIcons.notOsmOutside, iconAnchor: [0, 55]}
    : stopType === StopType.OSM
    ? hasReport
      ? reportApproved
        ? {iconUrl: stopIcons.osmReportApprove, iconAnchor: [30, 55]}
        : {iconUrl: stopIcons.osmReport, iconAnchor: [30, 55]}
      : {iconUrl: stopIcons.osmInside, iconAnchor: [30, 55]}
    : hasReport
    ? reportApproved
      ? {iconUrl: stopIcons.notOsmReportInsideApprove, iconAnchor: [0, 55]}
      : {iconUrl: stopIcons.notOsmReportInside, iconAnchor: [0, 55]}
    : {iconUrl: stopIcons.notOsmInside, iconAnchor: [0, 55]};
};

const getShadowProps = ({stopType}) => {
  return stopType === StopType.OSM
    ? {shadowUrl: shadowZTM, shadowAnchor: [34, 58]}
    : {shadowUrl: shadowOSM, shadowAnchor: [3, 58]};
};

const getReportColor = status => {
  switch (status) {
    case 0:
      return reportIcons.created;
    case 1:
      return reportIcons.approved;
    case 2:
      return reportIcons.rejected;
    case 99:
      return reportIcons.initial;
    default:
      return reportIcons.unexpected;
  }
};
