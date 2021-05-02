import React, {createContext, useState} from 'react';

export const MapContext = createContext();

const MapContextProvider = ({children}) => {
    const [showSingleTile, setShowSingleTile] = useState(false);
    const [isConnectionMode, setIsConnectionMode] = useState(false);
    const [isMapActive, setIsMapActive] = useState(false);
    const [areStopsVisible, setAreStopsVisible] = useState(false);

    const [propertyGrid, setProprtyGrid] = useState(null);

    const [connectionSidePanelMessage, setConnectionSidePanelMessage] = useState(null);
    const [connectionData, setConnectionData] = useState([]);

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

    const displayPropertyGrid = content => {
        setProprtyGrid(content);
    }

    const updateConnectionData = data => {
        if (data) {
            setConnectionData( oldState => [...oldState, data])
        }
    }

    const updateConnectionMessage = info => {
        setConnectionSidePanelMessage(info);
    }

    const flush = () => {
        setConnectionData([]);
        setProprtyGrid(null);
    }

    return (
        <MapContext.Provider
            value={{
                showSingleTile,
                isConnectionMode,
                isMapActive,
                areStopsVisible,
                propertyGrid,
                connectionSidePanelMessage,
                connectionData,
                singleTileToggle,
                connectionModeToggle,
                activeMapToggle,
                displayPropertyGrid,
                updateConnectionData,
                updateConnectionMessage,
                flush
            }}>
            {children}
        </MapContext.Provider>
    );
};

export default MapContextProvider;
