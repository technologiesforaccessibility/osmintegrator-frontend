import {Icon} from 'leaflet';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import iconBlack from '../assets/bus_stop_icon_black_new.png';
import iconPink from '../assets/bus_stop_icon_pink_new.png';
import iconGrey from '../assets/bus_stop_icon_grey.png';
import iconPurple from '../assets/bus_stop_icon_purple.png';
import iconGreen from '../assets/bus_stop_icon_green.png';
import iconYellow from '../assets/bus_stop_icon_yellow.png';
import iconViolet from '../assets/bus_stop_icon_violet.png';
import iconBlue from '../assets/bus_stop_icon_blue.png';
import iconOrange from '../assets/bus_stop_icon_orange_new.png';
import reporBlackIcon from '../assets/report_black.png';
import reportBlueIcon from '../assets/report_blue.png';
import reportGreenIcon from '../assets/report_green.png';
import reportRedIcon from '../assets/report_red.png';
import reportGreyIcon from '../assets/report_grey.png';


const reportIcons = {
  initial: reportGreyIcon,
  created: reportBlueIcon,
  approved: reportGreenIcon,
  rejected: reportRedIcon,
  unexpected: reporBlackIcon,
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

const getBusStopIcon = busStopPropeties => {
  return new Icon({
    iconUrl: getBusStopColor(busStopPropeties),
    shadowUrl: iconShadow,
    iconSize: [30, 55],
    iconAnchor: [15, 54],
    shadowSize: [68, 60],
    shadowAnchor: [-10, 55],
  });
};

const getReportIcon = status => {
  return new Icon({
    iconUrl: getReportColor(status),
    shadowUrl: iconShadow,
    iconSize: [30, 55],
    iconAnchor: [15, 54],
    shadowSize: [68, 60],
    shadowAnchor: [-10, 55],
  });
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

const getBusStopColor = busProperty => {
  if (busProperty.outsideSelectedTile) {
    if (busProperty.stopType === 0) {
      return iconGrey;
    }
    return iconPurple;
  } else {
    if (busProperty.stopType === 0) {
      return iconBlack;
    }
    return iconPink;
  }
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
