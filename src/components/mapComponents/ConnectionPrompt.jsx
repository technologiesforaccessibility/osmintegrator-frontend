import React, {useState} from 'react';

import client from '../../api/apiInstance';
import {getDefaultHeadersWithToken} from '../../config/apiConfig';
import {generateConnectionData} from "../../utilities/mapUtilities";

import '../../stylesheets/connectionPrompt.scss';


const ConnectionPrompt = ({names, reset, connectionPair, info, updateInfo}) => {
    

    const sendConnection = async () => {
        try {
            const response = await client.api.connectionsUpdate(
                generateConnectionData(connectionPair),
                {
                    headers: getDefaultHeadersWithToken(localStorage.token),
                },
            );
            if (response.status === 200) {
                updateInfo('Saved successfully')
            }

        } catch (error) {
            console.log(error);
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
            <button>Cancel</button>
            {info && <p>{info}</p>}
        </div>
    );
};

export default ConnectionPrompt;
