import PropTypes, {bool, arrayOf, func} from 'prop-types';
import {Rectangle, Tooltip} from 'react-leaflet';

import {tileType} from '../../types/index';

import colors from '../../stylesheets/config/colors.module.scss';

const MapTiles = ({isTileActive, tiles, activeTile, setActiveTile, addReportMarker, isCreateReportMapMode}) => {
  const color = ({approvedBySupervisor, approvedByEditor, usersCount}) => {
    if (approvedBySupervisor) {
      return colors.colorApprovedBySupervisor;
    }
    if (approvedByEditor) {
      return colors.colorApprovedByEditor;
    }
    if (usersCount) return colors.colorTileAssigned;
    return colors.colorTileAll;
  };

  const opacity = tile => {
    if (!tile.approvedByEditor && !tile.approvedBySupervisor) {
      return 0.2;
    }
    if (tile.approvedByEditor && !tile.approvedBySupervisor) {
      return 0.5;
    }
    return 0.5;
  };

  return (
    <>
      {isTileActive ? (
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

PropTypes.MapTiles = {
  isTileActive: bool,
  tiles: arrayOf(tileType),
  activeTile: tileType,
  setActiveTile: func,
  addReportMarker: func,
  isCreateReportMapMode: bool,
};

export default MapTiles;
