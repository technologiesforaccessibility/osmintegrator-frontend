import React, {Fragment, useContext} from 'react';

import {MapContext} from './contexts/MapContextProvider';
import ConnectionSidePanel from './ConnectionSidePanel';

const MapPanel = () => {
    const {
        showSingleTile,
        isConnectionMode,
        singleTileToggle,
        connectionModeToggle,
        flush,
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
                            checked={isConnectionMode}
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
                    {isConnectionMode && <ConnectionSidePanel />}

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
                                e.target.checked && flush();
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
