import React, {createContext, useState} from 'react';

export const MapContext = createContext();

const MapContextProvider = ({children}) => {
    const [showSingleTile, setShowSingleTile] = useState(false);
    const [isConnectionMode, setIsConnectionMode] = useState(false);
    const [isMapActive, setIsMapActive] = useState(false);
    const [areStopsVisible, setAreStopsVisible] = useState(false);
    const [connectionPromptNames, setConnectionPromptNames] = useState([]);
    const [propertyGrid, setProprtyGrid] = useState(null);
    const [connectionPair, setConnectionPair] = useState(null);

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

    const addConnectionPromptName = name => {
        setConnectionPromptNames( oldState => [...oldState, name])
    }

    const resetConnectionPrompt = () => {
        setConnectionPromptNames( [])
    }

    const displayPropertyGrid = content => {
        setProprtyGrid(content);
    }

    const updateConnectionData = connectionPair => {
        setConnectionPair(connectionPair);
    }

    return (
        <MapContext.Provider
            value={{
                showSingleTile,
                isConnectionMode,
                isMapActive,
                areStopsVisible,
                connectionPromptNames,
                propertyGrid,
                connectionPair,
                singleTileToggle,
                connectionModeToggle,
                activeMapToggle,
                addConnectionPromptName,
                displayPropertyGrid,
                resetConnectionPrompt,
                updateConnectionData
            }}>
            {children}
        </MapContext.Provider>
    );
};

export default MapContextProvider;
