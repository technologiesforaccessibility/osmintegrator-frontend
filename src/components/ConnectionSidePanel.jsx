import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import Button from '@mui/material/Button';

import api from '../api/apiInstance';
import {basicHeaders} from '../config/apiConfig';
import {generateConnectionData, generateStopName} from '../utilities/mapUtilities';
import {MapContext} from './contexts/MapContextProvider';
import {NotificationActions} from '../redux/actions/notificationActions';
import {exception} from '../utilities/exceptionHelper';

import '../stylesheets/connectionPrompt.scss';

const ConnectionSidePanel = () => {
  const {connectionData, reset, shouldRenderConnections, activeTile} = useContext(MapContext);
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const sendConnection = async () => {
    try {
      if (connectionData.length !== 2) {
        dispatch(NotificationActions.error(t('connection.mark2Stops')));
        return;
      }

      await api.connectionsUpdate(generateConnectionData(connectionData, activeTile.id), {
        headers: basicHeaders(),
      });
      shouldRenderConnections(true);
      reset();
      dispatch(NotificationActions.success(t('connection.createSuccessMessage')));
    } catch (error) {
      exception(error);
    }
  };

  return (
    <div className="connection-prompt__wrapper">
      {t('connection.formTitle')}
      <label className="connection-prompt__label">
        {connectionData.length > 0
          ? generateStopName(connectionData[0].id, connectionData[0].name || null, connectionData[0].ref || null)
          : '...'}
      </label>
      <label className="connection-prompt__label">
        {' '}
        {connectionData.length > 1
          ? generateStopName(connectionData[1].id, connectionData[1].name || null, connectionData[1].ref || null)
          : '...'}
      </label>

      <div className="connection-prompt__button-container">
        <Button
          variant="contained"
          onClick={() => {
            sendConnection();
          }}>
          {t('buttons.save')}{' '}
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            reset();
          }}>
          {t('buttons.cancel')}{' '}
        </Button>
      </div>
    </div>
  );
};

export default ConnectionSidePanel;
