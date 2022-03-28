import './positionChangePanel.scss';

import { Button, Stack, Typography } from '@mui/material';
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
      {!activeStop && (
        <Typography variant="subtitle2" gutterBottom>
          {t('pan.selectPrompt')}
        </Typography>
      )}
      {activeStop && activeStop.stopType === StopType.GTFS && (
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
            <fieldset className="position-change-panel__details">
              <legend className="position-change-panel__heading">{t('tileDetails.coordinates')}</legend>
              <div className="position-change-panel__body">
                <span>
                  {t('pan.lat')} {(currentMovedStop?.position?.lat ?? activeStop.lat)?.toFixed(6)}
                </span>
                <span>
                  {t('pan.long')} {(currentMovedStop?.position?.lng ?? activeStop.lon)?.toFixed(6)}
                </span>
                <span>
                  {t('pan.initLat')} {(activeStop.initLat ?? activeStop.lat)?.toFixed(6)}
                </span>
                <span>
                  {t('pan.initLong')} {(activeStop.initLon ?? activeStop.lat)?.toFixed(6)}
                </span>
              </div>
            </fieldset>
          </Stack>
          <Button
            variant="contained"
            disabled={isPositionTheSameAsInitial || !currentMovedStop}
            onClick={resetPosition}>
            {t('pan.resetPosition')}
          </Button>
        </Stack>
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
