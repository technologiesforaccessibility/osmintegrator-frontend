import { Button, Divider, FormControl, Input, InputLabel, Stack, Typography } from '@mui/material';
import api from 'api/apiInstance';
import { MapContext } from 'components/contexts/MapContextProvider';
import { UserContext } from 'components/contexts/UserContextProvider';
import { basicHeaders } from 'config/apiConfig';
import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { NotificationActions } from 'redux/actions/notificationActions';
import { useAppDispatch } from 'redux/store';
import { MovedStopActionType, StopType } from 'types/enums';
import { exception } from 'utilities/exceptionHelper';

const PositionChangePanel: FC = () => {
  const { t } = useTranslation();
  const { setLoader } = useContext(UserContext);
  const { activeStop, markerReference, movedStops, movedStopsDispatch } = useContext(MapContext);
  const dispatch = useAppDispatch();

  const currentMovedStop = movedStops.find(item => item.id === activeStop?.id);

  const updatePosition = async () => {
    if (!movedStops?.length) return;

    try {
      setLoader(true);
      await api.stopChangePositionUpdate(
        {
          lat: currentMovedStop?.position?.lat!,
          lon: currentMovedStop?.position?.lng!,
          stopId: currentMovedStop?.id!,
        },
        { headers: basicHeaders() },
      );
      dispatch(NotificationActions.success(t('report.success')));
    } catch (error) {
      exception(error);
    } finally {
      setLoader(false);
    }
  };

  const resetPosition = () => {
    if (!activeStop) return;

    movedStopsDispatch({
      type: MovedStopActionType.REMOVE,
      payload: {
        id: activeStop.id!,
        externalId: activeStop.stopId!,
      },
    });

    const newLat = activeStop?.lat!;
    const newLng = activeStop?.lon!;

    const marker = markerReference as unknown as { setLatLng: (coordinates: { lat: number; lng: number }) => void };

    if (marker) {
      marker.setLatLng({
        lat: newLat,
        lng: newLng,
      });
    }
  };

  const isPositionTheSameAsInitial =
    (activeStop?.lat ?? activeStop?.initLat) === currentMovedStop?.position?.lat &&
    (activeStop?.lon ?? activeStop?.initLon) === currentMovedStop?.position?.lng;

  return (
    <div className="position-change-panel">
      <Typography variant="subtitle1" gutterBottom>
        {t('pan.header')}
      </Typography>
      <Typography variant="subtitle2">{t('pan.selectPrompt')}</Typography>
      {activeStop && activeStop.stopType === StopType.GTFS && (
        <>
          <Stack spacing={1}>
            <Button variant="contained" onClick={updatePosition}>
              {t('pan.updatePosition')}
            </Button>
            <Button
              variant="contained"
              disabled={isPositionTheSameAsInitial || !currentMovedStop}
              onClick={resetPosition}>
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
                <Input id="initialLat" value={(currentMovedStop?.position?.lat ?? activeStop.lat)?.toFixed(6)} />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="initialLng">Longitude</InputLabel>
                <Input id="initialLng" value={(currentMovedStop?.position?.lng ?? activeStop.lat)?.toFixed(6)} />
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
      {activeStop && activeStop.stopType === StopType.OSM && (
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Typography variant="subtitle1">{`${t('pan.chosenStop')}: ${activeStop.name}`}</Typography>
          <Typography variant="subtitle2">{t('pan.osmStopCannotBeMoved')}</Typography>
        </Stack>
      )}
    </div>
  );
};

export default PositionChangePanel;
