import React from 'react';

import client from '../../api/apiInstance';
import axios from "axios";
import {getDefaultHeadersWithToken} from "../../config/apiConfig";

import '../../stylesheets/connectionPrompt.scss';

const ConnectionPrompt = ({names, reset, connectionPair}) => {
    const generateConnectionData = connection => {
        if ((connection[0].isOsm === true) && (connection[1].isOsm === false)) {
            return JSON.stringify({
                OsmStopId: connection[0].id.toString(),
                GtfsStopId: connection[1].id.toString()
            })
        } else if ((connection[0].isOsm === false) && (connection[1].isOsm === true)) {
            return JSON.stringify({
                OsmStopId: connection[1].id.toString(),
                GtfsStopId: connection[0].id.toString()
            })
        }
        return null

    };

    const sendConnection = async() => {
        console.log(connectionPair);
        const conn = generateConnectionData(connectionPair);
        console.log(conn);
        await axios.put('http://localhost:9999/api/Connections/', conn, {headers: getDefaultHeadersWithToken(localStorage.token)})
        // await client.api.connectionsUpdate(generateConnectionData(connectionPair),
        //     {headers: getDefaultHeadersWithToken(localStorage.token)}
        //     )
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
        </div>
    );
};

export default ConnectionPrompt;
