import React, {useContext} from 'react';

import client from '../../api/apiInstance';
import {basicHeaders} from '../../config/apiConfig';
import {
    generateConnectionData,
    generateStopName,
} from '../../utilities/mapUtilities';
import {unsafeApiError} from '../../utilities/utilities';
import {MapContext} from '../contexts/MapContextProvider';

import '../../stylesheets/connectionPrompt.scss';

const ConnectionSidePanel = () => {
    const {
        connectionSidePanelMessage,
        updateConnectionMessage,
        connectionData,
        flush,
    } = useContext(MapContext);

    const sendConnection = async () => {
        if (connectionData.length === 2) {
            try {
                await client.api.connectionsUpdate(
                    generateConnectionData(connectionData),
                    {
                        headers: basicHeaders(),
                    },
                );
                flush();
                updateConnectionMessage('Saved successfully');
            } catch (error) {
                unsafeApiError(error);
            }
        }
    };

    return (
        <div className="connection-prompt__wrapper">
            Chosen stops for connection
            <label className="connection-prompt__label">
                {connectionData.length > 0
                    ? generateStopName(
                          connectionData[0].id,
                          connectionData[0].name || null,
                          connectionData[0].ref || null,
                      )
                    : '...'}
            </label>
            <label className="connection-prompt__label">
                {' '}
                {connectionData.length > 1
                    ? generateStopName(
                          connectionData[1].id,
                          connectionData[1].name || null,
                          connectionData[1].ref || null,
                      )
                    : '...'}
            </label>
            <button
                onClick={() => {
                    sendConnection();
                }}>
                Save
            </button>
            <button
                onClick={() => {
                    flush();
                    updateConnectionMessage(null);
                }}>
                Cancel
            </button>
            {connectionSidePanelMessage && <p>{connectionSidePanelMessage}</p>}
        </div>
    );
};

export default ConnectionSidePanel;
