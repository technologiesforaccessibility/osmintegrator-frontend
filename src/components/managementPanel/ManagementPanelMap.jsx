import React from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';

const ManagementPanelMap = ({startPoint, tiles, zoom}) => {
  return (
    <div className="map-container">
      <MapContainer center={startPoint} zoom={zoom} maxZoom={19} style={{height: '700px'}}>
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
