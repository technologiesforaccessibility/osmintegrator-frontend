import React, {Fragment} from 'react';
import {Rectangle, Tooltip} from 'react-leaflet';

import colors from '../../stylesheets/config/colors.module.scss';

const MapTiles = ({showSingleTile, tiles, activeTile, setActiveTile}) => {
    return (
        <Fragment>
            {showSingleTile ? (
                <Rectangle
                    bounds={[
                        [activeTile.maxLat, activeTile.maxLon],
                        [activeTile.minLat, activeTile.minLon],
                    ]}
                    pathOptions={{color: colors.colorTileActive}}
                />
            ) : (
                tiles.map((tile, index) => (
                    <Rectangle
                        key={index}
                        bounds={[
                            [tile.maxLat, tile.maxLon],
                            [tile.minLat, tile.minLon],
                        ]}
                        pathOptions={{color: colors.colorTileAll}}
                        eventHandlers={{
                            click: () => {
                                setActiveTile(tile);
                            },
                        }}>
                        <Tooltip direction="top">
                            x ={tile.x}, y={tile.y}
                        </Tooltip>
                    </Rectangle>
                ))
            )}
        </Fragment>
    );
};

export default MapTiles;
