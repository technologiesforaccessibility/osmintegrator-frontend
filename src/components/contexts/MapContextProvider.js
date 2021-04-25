import React, {createContext, useState} from 'react';

export const MapContext = createContext();

const MapContextProvider = ({children}) => {
    const [showSingleTile, setShowSingleTile] = useState(false);
    const [isConnectionMode, setIsConnectionMode] = useState(false);
    const [isMapActive, setIsMapActive] = useState(false);
    const [areStopsVisible, setAreStopsVisible] = useState(false);

    const singleTileToggle = bool => {
        setShowSingleTile(bool);
        setAreStopsVisible(bool);
    };

    // Connection mode active means property grid cant be displayed and vice versa
    const connectionModeToggle = () => {
        setIsConnectionMode(isConnectionMode => !isConnectionMode);
    };

    const activeMapToggle = bool => {
        setIsMapActive(bool);
    };

    return (
        <MapContext.Provider
            value={{
                showSingleTile,
                isConnectionMode,
                isMapActive,
                areStopsVisible,
                singleTileToggle,
                connectionModeToggle,
                activeMapToggle,
            }}>
            {children}
        </MapContext.Provider>
    );
};

export default MapContextProvider;
