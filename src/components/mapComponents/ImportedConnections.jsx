import React, {Fragment} from 'react';
import {Polyline, Tooltip, Popup} from 'react-leaflet';

import {
    generateConnectionData,
    generateStopName,
    getPosition,
} from '../../utilities/mapUtilities';

import colors from '../../stylesheets/colors.module.scss';
import client from '../../api/apiInstance';
import {basicHeaders} from '../../config/apiConfig';
import {unsafeApiError} from '../../utilities/utilities';

const ImportedConnections = ({
    stops,
    importedConnections,
    shouldRenderConnections,
}) => {
    const deleteConnection = async (osm, gtfs) => {
        try {
            await client.api.connectionsDelete(
                generateConnectionData([osm, gtfs]),
                {
                    headers: basicHeaders(),
                },
            );
            shouldRenderConnections(true);
        } catch (error) {
            unsafeApiError(error);
        }
    };

    return (
        <Fragment>
            {stops.length > 0 &&
                importedConnections.map(({osmStopId, gtfsStopId}, index) => {
                    const foundOSM = stops.find(stop => stop.id === osmStopId);
                    const foundGTFS = stops.find(
                        stop => stop.id === gtfsStopId,
                    );
                    if (foundOSM !== undefined && foundGTFS !== undefined) {
                        return (
                            <Polyline
                                pane={"markerPane"}
                                key={index}
                                pathOptions={{
                                    color: colors.colorConnectionImported,
                                }}
                                positions={getPosition(foundOSM, foundGTFS)}>
                                <Tooltip direction="bottom">
                                    Click line if you want to
                                    delete connection
                                </Tooltip>
                                <Popup>Delete?
                                    <button onClick={() => {console.log('confirm')}}>Confirm</button>
                                    <button onClick={() => {console.log('cancel')}}>Close</button>
                                </Popup>
                            </Polyline>
                        );
                    }
                    return <></>;
                })}
        </Fragment>
    );
};

export default ImportedConnections;
