import React from 'react';

import client from '../../api/apiInstance';
import {basicHeaders} from '../../config/apiConfig';
import {generateConnectionData} from '../../utilities/mapUtilities';
import {unsafeApiError} from '../../utilities/utilities';

import '../../stylesheets/connectionPrompt.scss';

const ConnectionPrompt = ({names, reset, connectionPair, info, updateInfo}) => {
    const sendConnection = async () => {
        try {
            await client.api.connectionsUpdate(
                generateConnectionData(connectionPair),
                {
                    headers: basicHeaders(),
                },
            );
            updateInfo('Saved successfully');
        } catch (error) {
            unsafeApiError(error);
        }
    };

    return (
        <div className="connection-prompt__wrapper">
            Chosen stops for connection
            <label className="connection-prompt__label">
                {names.length > 0 ? names[0] : '...'}
            </label>
            <label className="connection-prompt__label">
                {' '}
                {names.length > 1 ? names[1] : '...'}
            </label>
            <button
                onClick={() => {
                    sendConnection();
                    reset();
                }}>
                Save
            </button>
            <button
                onClick={() => {
                    reset();
                }}>
                Cancel
            </button>
            {info && <p>{info}</p>}
        </div>
    );
};

export default ConnectionPrompt;
