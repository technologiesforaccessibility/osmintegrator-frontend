import './mapLink.scss';

import MapIcon from '@mui/icons-material/Map';
import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import { LatLng, Map } from 'leaflet';
import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type TMapLinkProps = {
  map: Map;
};

const MapLink: FC<TMapLinkProps> = ({ map }) => {
  const { t } = useTranslation();
  const openInOsmTooltip = t('mapLink.openInOsmTooltip');

  const [position, setPosition] = useState<LatLng>(() => map.getCenter());
  const [zoom, setZoom] = useState<number>(() => map.getZoom());

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
    setZoom(map.getZoom());
  }, [map]);

  useEffect(() => {
    map.on('move', onMove);
    return () => {
      map.off('move', onMove);
    };
  }, [map, onMove]);

  const openInNewTab = () => {
    window.open(
      `https://www.openstreetmap.org/edit#map=${zoom}/${position.lat.toFixed(5)}/${position.lng.toFixed(5)}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <>
      <Tooltip title={openInOsmTooltip}>
        <Button
          endIcon={<MapIcon />}
          size="small"
          variant="contained"
          onClick={openInNewTab}
          sx={{
            fontColor: 'white',
            zIndex: '400',
            position: 'absolute',
            bottom: '70px',
            right: '10px',
            opacity: '0.8',
          }}>
          {t('mapLink.openInOsmTooltip')}
        </Button>
      </Tooltip>
    </>
  );
};

export default MapLink;
