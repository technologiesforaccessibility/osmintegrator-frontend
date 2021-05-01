import React, {Fragment} from 'react';
import {Polyline} from 'react-leaflet';


import {getPosition} from '../../utilities/mapUtilities';

import colors from '../../stylesheets/colors.module.scss';

const ImportedConnections = ({stops, importedConnections}) => {
    return (
        <Fragment>
            {stops.length > 0 &&
                importedConnections.map(({osmStopId, gtfsStopId}, index) => {
                    const foundOSM = stops.find(
                        stop => stop.id === osmStopId,
                    );
                    const foundGTFS = stops.find(
                        stop => stop.id === gtfsStopId,
                    );
                    if (foundOSM !== undefined && foundGTFS !== undefined) {
                        return (
                            <Polyline
                                key={index}
                                pathOptions={{color: colors.colorConnectionImported}}
                                positions={getPosition(foundOSM, foundGTFS)}
                            />
                        );
                    }
                    return <></>;
                })}
        </Fragment>
    );
};

export default ImportedConnections;
