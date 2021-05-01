import React, {Fragment, useContext} from 'react';

import {MapContext} from './contexts/MapContextProvider';
import ConnectionPrompt from './mapComponents/ConnectionPrompt';

const MapPanel = () => {
    const {
        showSingleTile,
        isConnectionMode,
        singleTileToggle,
        connectionModeToggle,
        connectionPromptNames,
        resetConnectionPrompt,
        connectionPair,
        connectionInfo,
        updateConnectionInfo
    } = useContext(MapContext);
    return (
        <Fragment>
            {showSingleTile && (
                <Fragment>
                    <div
                        className="form-check"
                        style={{paddingBottom: '1.25rem'}}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                            onClick={e => {
                                console.log(e.target.checked);
                                connectionModeToggle(e.target.checked);
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault">
                            Connect stops?
                        </label>
                    </div>
                    {isConnectionMode && (
                        <ConnectionPrompt
                            names={connectionPromptNames}
                            reset={resetConnectionPrompt}
                            connectionPair={connectionPair}
                            info={connectionInfo}
                            updateInfo={updateConnectionInfo}
                        />
                    )}

                    <div
                        className="form-check"
                        style={{paddingBottom: '1.25rem'}}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked="checked"
                            id="flexCheckDefault"
                            onClick={e => {
                                singleTileToggle(e.target.checked);
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault">
                            Show single tile
                        </label>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default MapPanel;
