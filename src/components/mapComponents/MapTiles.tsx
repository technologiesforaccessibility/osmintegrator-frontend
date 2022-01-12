import {LeafletMouseEvent} from 'leaflet';
import {FC} from 'react';
import {Rectangle, Tooltip} from 'react-leaflet';

import {Tile} from '../../api/apiClient';

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
  const color = ({approvedByEditor}: Tile): string => {
    if (approvedByEditor) {
      return colors.colorTileAssigned;
    }
    return colors.colorTileAll;
  };

  const opacity = (tile: Tile) => {
    return 0.2;
  };

  return (
    <>
      {isTileActive && activeTile ? (
        <Rectangle
          bounds={[
            [activeTile.maxLat, activeTile.maxLon],
            [activeTile.minLat, activeTile.minLon],
          ]}
          pathOptions={{color: colors.colorTileActive}}
          eventHandlers={{
            click: e => {
              isCreateReportMapMode && addReportMarker(e);
            },
          }}
        />
      ) : (
        tiles.map((tile, index) => (
          <Rectangle
            key={index}
            bounds={[
              [tile.maxLat, tile.maxLon],
              [tile.minLat, tile.minLon],
            ]}
            pathOptions={{
              color: color(tile),
              fillOpacity: opacity(tile),
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
        ))
      )}
    </>
  );
};

export default MapTiles;
