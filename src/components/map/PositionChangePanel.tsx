import { Button, Divider, FormControl, Input, InputLabel, Stack, Typography } from '@mui/material';
import api from 'api/apiInstance';
import { MapContext } from 'components/contexts/MapContextProvider';
import { UserContext } from 'components/contexts/UserContextProvider';
import ConversationHeading from 'components/conversation/ConversationHeading/ConversationHeading';
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
  const { activeStop, setActiveStop, markerReference, movedStops, movedStopsDispatch } = useContext(MapContext);
  const dispatch = useAppDispatch();

  const currentMovedStop = movedStops.find(item => item.id === activeStop?.id);

  const updatePosition = async (data: { lat: number; lon: number; stopId: string }) => {
    try {
      setLoader(true);
      await api.stopChangePositionUpdate(data, { headers: basicHeaders() });
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
      updatePosition({ lat: newLat, lon: newLng, stopId: activeStop.id! });
    }
  };

  const isPositionTheSameAsInitial =
    (activeStop?.lat ?? activeStop?.initLat) === currentMovedStop?.position?.lat &&
    (activeStop?.lon ?? activeStop?.initLon) === currentMovedStop?.position?.lng;

  return (
    <div className="position-change-panel">
      <Typography variant="subtitle2" gutterBottom>
        {t('pan.selectPrompt')}
      </Typography>
      {activeStop && activeStop.stopType === StopType.GTFS && (
        <>
          <Stack spacing={1}>
            <Button
              variant="contained"
              disabled={isPositionTheSameAsInitial || !currentMovedStop}
              onClick={resetPosition}>
              {t('pan.resetPosition')}
            </Button>
            <Divider />
          </Stack>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Stack spacing={3}>
              <ConversationHeading
                activeStop={activeStop}
                lat={0}
                lon={0}
                handleCloseReport={() => setActiveStop(null)}
                isReportActive={false}
                hasReport={false}
              />
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
          <ConversationHeading
            activeStop={activeStop}
            lat={0}
            lon={0}
            handleCloseReport={() => setActiveStop(null)}
            isReportActive={false}
            hasReport={false}
          />
          <Typography variant="subtitle2">{t('pan.osmStopCannotBeMoved')}</Typography>
        </Stack>
      )}
    </div>
  );
};

export default PositionChangePanel;
