import { Tile } from 'api/apiClient';
import gtfsStopIcon from 'assets/angledIcons/gtfs_stop.png';
import gtfsStopReportIcon from 'assets/angledIcons/gtfs_stop_report.png';
import gtfsStopReportApprovedIcon from 'assets/angledIcons/gtfs_stop_report_approved.png';
import osmStopIcon from 'assets/angledIcons/osm_stop.png';
import osmStopReportIcon from 'assets/angledIcons/osm_stop_report.png';
import osmStopReportApprovedIcon from 'assets/angledIcons/osm_stop_report_approved.png';
import osmStopReportApprovedOutsideIcon from 'assets/angledIcons/osm_stop_report_approved-out.png';
import osmStopReportOutsideIcon from 'assets/angledIcons/osm_stop_report-out.png';
import osmStopOutsideIcon from 'assets/angledIcons/osm_stop-out.png';
import shadowOSM from 'assets/angledIcons/shadow_osm.png';
import shadowZTM from 'assets/angledIcons/shadow_ztm.png';
import reportBlueIcon from 'assets/report_blue.png';
import shadowReport from 'assets/report_frame.png';
import reportGrayIcon from 'assets/report_gray.png';
import reportGreenIcon from 'assets/report_green.png';
import { Icon } from 'leaflet';
import { useTranslation } from 'react-i18next';
import { StopType } from 'types/enums';
import { TBusStopProperties, TStopIconProperties, TStopShadowProperties } from 'types/stops';

import { visibilityIcons } from './constants';

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

const comparePasswords = (pass1: string, pass2: string) => {
  return pass1 === pass2;
};

const isPasswordStrong = (password: string) => {
  const pattern = /^\S{8,}$/g;
  return password.match(pattern);
};

const getTokenFromPath = (urlString: string) => {
  try {
    const url = new URL(urlString);
    const rawToken = url.searchParams.get('token');
    return rawToken?.split(' ').join('+');
  } catch (err: any) {
    return err.message;
  }
};

const getEmailFromPath = (urlString: string) => {
  try {
    const url = new URL(urlString);
    return url.searchParams.get('email');
  } catch (err: any) {
    return err.message;
  }
};

const getStopIconProps = ({
  outsideSelectedTile,
  stopType,
  hasReport,
  reportApproved,
}: TBusStopProperties): TStopIconProperties => {
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

const getShadowProps = ({ stopType }: TBusStopProperties): TStopShadowProperties => {
  return stopType === StopType.OSM
    ? { shadowUrl: shadowZTM, shadowAnchor: [34, 58] }
    : { shadowUrl: shadowOSM, shadowAnchor: [3, 58] };
};

const getBusStopIcon = (busStopProperties: TBusStopProperties, isActive: boolean) => {
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

const getReportColor = (status: number) => {
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

const getReportIcon = (status: number, isActive: boolean = false) => {
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

const unsafeApiError = (errorInstance: any, optionalUserMessage: string) => {
  if (errorInstance.status === 401) {
    // eslint-disable-next-line no-console
    console.log('Authorization problem');
  }
  if (optionalUserMessage) {
    // eslint-disable-next-line no-console
    console.log(optionalUserMessage);
  } else {
    // eslint-disable-next-line no-console
    console.log('Unknown problem');
  }
};

const unsafeFormApiError = (error: any, translate: typeof useTranslation, option: string): string => {
  if (error.status === 401) {
    return translate(`${option}.401`).toString();
  }
  if (error.status === 400) {
    return translate('400').toString();
  } else {
    return translate('unrecognizedProblem').toString();
  }
};

const getVisibilityValueFromStateOrReturn = (itemKey: string, reset: boolean) => {
  const storageItem = localStorage.getItem(itemKey);

  if (storageItem && !reset) {
    //good for now - can be rafactored later
    const connectionVisibilityKey = Object.entries(visibilityIcons).filter(
      el => el[1].text === JSON.parse(storageItem).text,
    )[0][0];

    switch (connectionVisibilityKey) {
      case 'hidden':
        return visibilityIcons.hidden;
      case 'semiTransparent':
        return visibilityIcons.semiTransparent;
      case 'visible':
        return visibilityIcons.visible;
      default:
        return visibilityIcons.visible;
    }
  } else {
    return visibilityIcons.visible;
  }
};

const areCoordinatesOnTile = (lat: number, lon: number, tile: Tile) =>
  lat >= tile.minLat && lat <= tile.maxLat && lon >= tile.minLon && lon <= tile.maxLon;

export {
  areCoordinatesOnTile,
  comparePasswords,
  getBusStopIcon,
  getEmailFromPath,
  getReportIcon,
  getTokenFromPath,
  getVisibilityValueFromStateOrReturn,
  isPasswordStrong,
  unsafeApiError,
  unsafeFormApiError,
};
