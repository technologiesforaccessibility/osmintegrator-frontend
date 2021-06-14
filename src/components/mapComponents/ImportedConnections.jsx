import React, {Fragment, useRef} from 'react';
import {Polyline, Tooltip, Popup} from 'react-leaflet';

import {
    generateConnectionData,
    getPosition,
} from '../../utilities/mapUtilities';

import colors from '../../stylesheets/config/colors.module.scss';
import client from '../../api/apiInstance';
import {basicHeaders} from '../../config/apiConfig';
import {unsafeApiError} from '../../utilities/utilities';
import DeleteConnectionPopup from './DeleteConnectionPopup';

const ImportedConnections = ({
    stops,
    importedConnections,
    shouldRenderConnections,
}) => {
    const popupRef = useRef(null);

    const checkStopType = stopList => {
        return stopList.map(stop => {
            return {...stop, isOsm: stop.stopType === 0};
        });
    };

    const deleteConnection = async (osm, gtfs) => {
        try {
            await client.api.connectionsDelete(
                generateConnectionData(checkStopType([osm, gtfs])),
                {
                    headers: basicHeaders(),
                },
            );
            shouldRenderConnections(true);
        } catch (error) {
            unsafeApiError(error);
        }
    };

    const closePopup = () => {
        popupRef.current._close();
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
                                pane={'markerPane'}
                                key={index}
                                pathOptions={{
                                    color: colors.colorConnectionImported,
                                }}
                                positions={getPosition(foundOSM, foundGTFS)}>
                                <Tooltip direction="bottom">
                                    Click line if you want to delete connection
                                </Tooltip>
                                <Popup
                                    ref={popupRef}
                                    key={index}
                                    closeButton={false}>
                                    <DeleteConnectionPopup
                                        closePopup={closePopup}
                                        deleteConnection={deleteConnection}
                                        gtfs={foundGTFS}
                                        osm={foundOSM}
                                    />
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
