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

  const currentMovedStopCoordinates = movedStops.find(item => item.id === activeStop?.id);

  const updatePosition = async () => {
    if (!movedStops?.length) return;

    try {
      setLoader(true);
      await api.stopChangePositionUpdate(
        {
          lat: currentMovedStopCoordinates?.position?.lat!,
          lon: currentMovedStopCoordinates?.position?.lng!,
          stopId: currentMovedStopCoordinates?.id!,
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

    const marker = markerReference as unknown as { setLatLng: (coordinates: { lat: number; lng: number }) => void };

    if (marker) {
      marker.setLatLng({
        lat: activeStop.initLat ?? activeStop.lat ?? 0,
        lng: activeStop.initLon ?? activeStop.lon ?? 0,
      });
    }
  };

  const isPositionTheSameAsInitial =
    (activeStop?.lat ?? activeStop?.initLat) === currentMovedStopCoordinates?.position?.lat &&
    (activeStop?.lon ?? activeStop?.initLon) === currentMovedStopCoordinates?.position?.lng;

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
              disabled={isPositionTheSameAsInitial || !currentMovedStopCoordinates}
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
