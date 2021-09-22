import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import api from '../api/apiInstance';
import {webError} from './../utilities/messagesHelper';
import {basicHeaders} from '../config/apiConfig';
import {generateConnectionData, generateStopName} from '../utilities/mapUtilities';
import {MapContext} from './contexts/MapContextProvider';
import {NotificationActions} from '../redux/actions/notificationActions';

import '../stylesheets/connectionPrompt.scss';

const ConnectionSidePanel = () => {
  const {connectionData, reset, shouldRenderConnections} = useContext(MapContext);
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const sendConnection = async () => {
    try {
      if (connectionData.length !== 2) {
        dispatch(NotificationActions.error(t('connection.mark2Stops')));
        return;
      }

      await api.connectionsUpdate(generateConnectionData(connectionData), {
        headers: basicHeaders(),
      });
      shouldRenderConnections(true);
      reset();
      dispatch(NotificationActions.success(t('connection.createSuccessMessage')));
    } catch (error) {
      error instanceof Response ? webError(error) : dispatch(NotificationActions.error(t('error.exception')));
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
      <button
        onClick={() => {
          sendConnection();
        }}>
        Save
      </button>
      <button
        onClick={() => {
          reset();
        }}>
        Cancel
      </button>
    </div>
  );
};

export default ConnectionSidePanel;
