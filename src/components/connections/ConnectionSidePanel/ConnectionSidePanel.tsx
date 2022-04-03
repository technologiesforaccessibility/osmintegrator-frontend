import './connectionPrompt.scss';

import Button from '@mui/material/Button';
import { NewConnection } from 'api/apiClient';
import api from 'api/apiInstance';
import { basicHeaders } from 'config/apiConfig';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { NotificationActions } from 'redux/actions/notificationActions';
import { ConnectionRadio, StopType } from 'types/enums';
import { exception } from 'utilities/exceptionHelper';
import { generateConnectionData, generateStopName } from 'utilities/mapUtilities';

import { MapContext } from '../../contexts/MapContextProvider';

const ConnectionSidePanel = () => {
  const {
    connectionData,
    setConnectionData,
    setConnectionRadio,
    setImportedConnections,
    activeTile,
    setNewReportCoordinates,
    setActiveStop,
    newReportCoordinates,
    displayPropertyGrid,
  } = useContext(MapContext);
  const [error, setError] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (newReportCoordinates.lat && newReportCoordinates.lon) {
      displayPropertyGrid(null);
    }
    setNewReportCoordinates({ lat: null, lon: null });
    setActiveStop(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetConnection = () => {
    setConnectionData([]);
    setConnectionRadio(ConnectionRadio.ADD);
    setActiveStop(null);

    setError(false);
  };

  const sendConnection = async () => {
    try {
      if (connectionData.length !== 2) {
        dispatch(NotificationActions.error(t('connection.mark2Stops')));
        setError(true);
        return;
      }

      const response = await api.connectionsUpdate(generateConnectionData(connectionData, activeTile?.id), {
        headers: basicHeaders(),
      });
      const { connectionId }: NewConnection = response.data || {};
      const gtfsStopId = connectionData.find(s => s.stopType === StopType.GTFS)?.id;
      const osmStopId = connectionData.find(s => s.stopType === StopType.OSM)?.id;
      setImportedConnections(oldConnections => [
        ...oldConnections,
        { id: connectionId, exported: false, gtfsStopId, osmStopId },
      ]);
      resetConnection();
      dispatch(NotificationActions.success(t('connection.createSuccessMessage')));
      setActiveStop(null);
    } catch (err) {
      exception(err);
    }
  };

  return (
    <div className="connection-prompt">
      <div className="connection-prompt__wrapper bordered-wrapper">
        <p className="connection-prompt__title">{t('connection.formTitle')}</p>

        <fieldset
          className={`connection-prompt__field ${
            error && connectionData.length < 1 && 'connection-prompt__field--error'
          }`}>
          <legend>{t('connection.chooseFirstStop')}</legend>

          <span>{connectionData.length > 0 ? generateStopName(connectionData[0]) : '...'}</span>
        </fieldset>

        <fieldset
          className={`connection-prompt__field ${
            error && connectionData.length < 2 && 'connection-prompt__field--error'
          }`}>
          <legend>{t('connection.chooseSecondStop')}</legend>

          <span>{connectionData.length > 1 ? generateStopName(connectionData[1]) : '...'}</span>
        </fieldset>

        <div className="connection-prompt__button-container">
          <Button
            variant="contained"
            onClick={() => {
              sendConnection();
            }}>
            {t('buttons.save')}{' '}
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              resetConnection();
            }}>
            {t('buttons.cancel')}{' '}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionSidePanel;
