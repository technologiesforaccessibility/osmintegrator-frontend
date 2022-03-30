import './positionChangePanel.scss';

import { Button, Stack, Typography } from '@mui/material';
import api from 'api/apiInstance';
import { MapContext } from 'components/contexts/MapContextProvider';
import { UserContext } from 'components/contexts/UserContextProvider';
import ConversationHeading from 'components/conversation/ConversationHeading/ConversationHeading';
import ConfirmPopup from 'components/extra/ConfirmPopup';
import { basicHeaders } from 'config/apiConfig';
import { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NotificationActions } from 'redux/actions/notificationActions';
import { useAppDispatch } from 'redux/store';
import { MovedStopActionType, StopType } from 'types/enums';
import { exception } from 'utilities/exceptionHelper';

const PositionChangePanel: FC = () => {
  const { t } = useTranslation();
  const { setLoader } = useContext(UserContext);
  const { activeStop, setActiveStop, markerReference, movedStops, movedStopsDispatch, tileStops, setTileStops } =
    useContext(MapContext);
  const dispatch = useAppDispatch();
  const [isPopupOpen, setPopupOpen] = useState(false);

  const currentMovedStop = movedStops.find(item => item.id === activeStop?.id);

  const updatePosition = async (data: { lat: number; lon: number; stopId: string }) => {
    try {
      setLoader(true);
      await api.stopChangePositionUpdate(data, { headers: basicHeaders() });
      dispatch(NotificationActions.success(t('pan.stopWasMoved')));

      const newTileStops = [...tileStops];
      newTileStops.forEach(stop => {
        if (stop.id === data.stopId) {
          if (!stop.initLat && !stop.initLon) {
            stop.initLat = stop.lat;
            stop.initLon = stop.lon;
          }
          stop.lat = data.lat;
          stop.lon = data.lon;
        }
      });
      setTileStops(newTileStops);
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

    const newLat = activeStop?.initLat!;
    const newLng = activeStop?.initLon!;

    const marker = markerReference as unknown as { setLatLng: (coordinates: { lat: number; lng: number }) => void };

    if (marker) {
      marker.setLatLng({
        lat: newLat,
        lng: newLng,
      });
      updatePosition({ lat: newLat, lon: newLng, stopId: activeStop.id! });
    }
  };

  const isPositionTheSameAsInitial = !!currentMovedStop
    ? activeStop?.initLat === currentMovedStop?.position?.lat && activeStop?.initLon === currentMovedStop?.position?.lng
    : (!activeStop?.initLat && !activeStop?.initLon) ||
      (activeStop?.initLat === activeStop?.lat && activeStop?.initLon == activeStop?.lon);

  useEffect(() => {
    if (activeStop?.stopType === StopType.OSM) {
      dispatch(NotificationActions.info(t('pan.stopIsOsm')));
    }
  }, [activeStop]);

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
                {!isPositionTheSameAsInitial ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <span>
                      {t('pan.lat')} {(activeStop.initLat ?? activeStop.lat)?.toFixed(6)}
                    </span>
                    <span>
                      {t('pan.long')} {(activeStop.initLon ?? activeStop.lon)?.toFixed(6)}
                    </span>
                  </>
                )}
              </div>
            </fieldset>
          </Stack>

          {!isPositionTheSameAsInitial && (
            <>
              <Button variant="contained" onClick={() => setPopupOpen(true)}>
                {t('pan.resetPosition')}
              </Button>
              <ConfirmPopup
                text={t('pan.confirmResetText')}
                isOpen={isPopupOpen}
                onClose={() => setPopupOpen(false)}
                onClick={resetPosition}
              />
            </>
          )}
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
        </Stack>
      )}
    </div>
  );
};

export default PositionChangePanel;
