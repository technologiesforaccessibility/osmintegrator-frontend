import { LeafletMouseEvent } from 'leaflet';
import React, { FC } from 'react';
import { Rectangle, Tooltip } from 'react-leaflet';
import TextPath from 'react-leaflet-textpath';

import { Tile } from '../../api/apiClient';
import colors from '../../stylesheets/config/colors.module.scss';

interface MapTilesProps {
  isTileActive: boolean;
  tiles: Array<Tile>;
  activeTile: Tile | null;
  setActiveTile: (arg: Tile) => void;
  addReportMarker: (e: LeafletMouseEvent) => void;
  isCreateReportMapMode: boolean;
}

const MapTiles: FC<MapTilesProps> = ({
  isTileActive,
  tiles,
  activeTile,
  setActiveTile,
  addReportMarker,
  isCreateReportMapMode,
}) => {
  const color = ({ assignedUserName, unconnectedGtfsStopsCount }: Tile): string => {
    if (unconnectedGtfsStopsCount === 0) {
      return colors.colorTileCompleted;
    }

    return assignedUserName ? colors.colorTileAssigned : colors.colorTileAll;
  };

  const opacity = 0.2;

  return (
    <>
      {isTileActive && activeTile ? (
        <Rectangle
          bounds={[
            [activeTile.maxLat, activeTile.maxLon],
            [activeTile.minLat, activeTile.minLon],
          ]}
          pathOptions={{ color: colors.colorTileActive }}
          eventHandlers={{
            click: e => {
              if (isCreateReportMapMode) addReportMarker(e);
            },
          }}
        />
      ) : (
        tiles.map((tile, index) => (
          <React.Fragment key={tile.id}>
            <TextPath
              positions={[
                [tile.minLat + (tile.maxLat - tile.minLat) / 2, tile.minLon],
                [tile.minLat + (tile.maxLat - tile.minLat) / 2, tile.maxLon],
              ]}
              text={`${tile.unconnectedGtfsStopsCount}/${tile.gtfsStopsCount}`}
              color=""
              center
            />
            <Rectangle
              key={index}
              bounds={[
                [tile.maxLat, tile.maxLon],
                [tile.minLat, tile.minLon],
              ]}
              pathOptions={{
                color: color(tile),
                fillOpacity: opacity,
              }}
              eventHandlers={{
                click: () => {
                  setActiveTile(tile);
                },
              }}>
              <Tooltip direction="top">
                x ={tile.x}, y={tile.y}
              </Tooltip>
            </Rectangle>
          </React.Fragment>
        ))
      )}
    </>
  );
};

export default MapTiles;
