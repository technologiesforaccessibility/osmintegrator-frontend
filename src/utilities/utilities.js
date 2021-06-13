import {Icon} from 'leaflet';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import iconBlack from '../assets/bus_stop_icon_black_new.png';
import iconPink from '../assets/bus_stop_icon_pink_new.png';
import iconGrey from '../assets/bus_stop_icon_grey.png';
import iconPurple from '../assets/bus_stop_icon_purple.png';

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

const unsafeApiError = (error, userMessage) => {
    if (error.status === 401) {
        console.log('Authorization problem');
    }
    if (userMessage) {
        console.log(userMessage);
    } else {
        console.log('Unknown problem');
    }
};

const unsafeFormApiError = (error, translate, option) => {
    if (error.status === 401) {
        return(translate(`${option}.401`))
    }
    if (error.status === 400) {
        return (translate(400))
    } else {
        return (translate('unrecognizedProblem'))
    }
};

export {
    unsafeApiError,
    comparePasswords,
    getTokenFromPath,
    getEmailFromPath,
    isPasswordStrong,
    getBusStopIcon,
    unsafeFormApiError
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
