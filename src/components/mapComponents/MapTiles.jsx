import {Rectangle, Tooltip} from 'react-leaflet';

import colors from '../../stylesheets/config/colors.module.scss';

const MapTiles = ({isTileActive, tiles, activeTile, setActiveTile, addReportMarker, isReportMapMode}) => {
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
              isReportMapMode && addReportMarker(e);
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
            pathOptions={{color: tile.approvedByEditor ? colors.colorTileForApproval : colors.colorTileAll, fillOpacity:  tile.approvedByEditor ? 0.5 : 0.2}}
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
