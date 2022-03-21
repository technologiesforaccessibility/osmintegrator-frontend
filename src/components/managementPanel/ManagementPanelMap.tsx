import { LatLngExpression } from 'leaflet';
import { CSSProperties, FC } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

type TManagementPanelMapProps = {
  startPoint: LatLngExpression;
  tiles: JSX.Element[];
  zoom: number;
};

const mapStyle: CSSProperties = {
  position: 'relative',
  height: 'calc(100vh - 5rem)',
};

const ManagementPanelMap: FC<TManagementPanelMapProps> = ({ startPoint, tiles, zoom }) => {
  return (
    <div>
      <MapContainer style={mapStyle} center={startPoint} zoom={zoom} maxZoom={19}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />
        {tiles}
      </MapContainer>
    </div>
  );
};

export default ManagementPanelMap;
