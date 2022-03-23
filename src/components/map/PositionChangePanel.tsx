import { Button, Divider, FormControl, Input, InputLabel, Stack, Typography } from '@mui/material';
import { MapContext } from 'components/contexts/MapContextProvider';
import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { MovedStopActionType, StopType } from 'types/enums';

const PositionChangePanel: FC = () => {
  const { t } = useTranslation();
  const { activeStop, markerReference, movedStops, movedStopsDispatch } = useContext(MapContext);

  const currentMovedStopCoordinates = movedStops.find(item => item.id === activeStop?.id);

  const resetPosition = () => {
    if (!activeStop) return;

    movedStopsDispatch({
      type: MovedStopActionType.REMOVE,
      payload: {
        id: activeStop.id!,
        externalId: activeStop.stopId!,
      },
    });

    const marker = markerReference as unknown as { setLatLng: (coordinates: { lat: number; lng: number }) => void };

    if (marker) {
      marker.setLatLng({
        lat: activeStop.initLat ?? activeStop.lat ?? 0,
        lng: activeStop.initLon ?? activeStop.lon ?? 0,
      });
    }
  };

  return (
    <div className="position-change-panel">
      <Typography variant="subtitle1" gutterBottom>
        {t('pan.header')}
      </Typography>
      <Typography variant="subtitle2">{t('pan.selectPrompt')}</Typography>
      {activeStop && activeStop.stopType === StopType.GTFS && (
        <>
          <Stack spacing={1}>
            <Button variant="contained" onClick={() => {}}>
              {t('pan.updatePosition')}
            </Button>
            <Button variant="contained" onClick={resetPosition}>
              {t('pan.resetPosition')}
            </Button>
            <Divider />
          </Stack>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Typography variant="subtitle1">{`${t('pan.chosenStop')}: ${activeStop.name}`}</Typography>
            <Divider />
            <Stack spacing={3}>
              <Typography variant="subtitle2">{t('pan.position')}</Typography>
              <FormControl>
                <InputLabel htmlFor="initialLat">Latitude</InputLabel>
                <Input
                  id="initialLat"
                  value={(currentMovedStopCoordinates?.position?.lat ?? activeStop.lat)?.toFixed(6)}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="initialLng">Longitude</InputLabel>
                <Input
                  id="initialLng"
                  value={(currentMovedStopCoordinates?.position?.lng ?? activeStop.lat)?.toFixed(6)}
                />
              </FormControl>
            </Stack>
            <Divider />
            <Stack spacing={3}>
              <Typography variant="subtitle2">{t('pan.initialPosition')}</Typography>
              <FormControl>
                <InputLabel htmlFor="initialLat">Latitude</InputLabel>
                <Input id="initialLat" value={(activeStop.initLat ?? activeStop.lat)?.toFixed(6)} />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="initialLng">Longitude</InputLabel>
                <Input id="initialLng" value={(activeStop.initLon ?? activeStop.lon)?.toFixed(6)} />
              </FormControl>
            </Stack>
          </Stack>
        </>
      )}
    </div>
  );
};

export default PositionChangePanel;
