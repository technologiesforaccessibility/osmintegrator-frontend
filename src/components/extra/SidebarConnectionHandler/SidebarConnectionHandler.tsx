import './sidebarConnectionHandler.scss';

import Button from '@mui/material/Button';
import api from 'api/apiInstance';
import { basicHeaders } from 'config/apiConfig';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationActions } from 'redux/actions/notificationActions';
import { selectLoggedInUserRoles } from 'redux/selectors/authSelector';
import { roles } from 'utilities/constants';
import { exception } from 'utilities/exceptionHelper';
import { generateConnectionData, generateStopName } from 'utilities/mapUtilities';

import { MapContext } from '../../contexts/MapContextProvider';

const SidebarConnectionHandler = () => {
  const {
    connectedStopPair,
    setIsSidebarConnectionHandlerVisible,
    setImportedConnections,
    setConnectedStopPair,
    isSidebarConnectionHandlerVisible,
    activeStop,
  } = useContext(MapContext);
  const authRoles = useSelector(selectLoggedInUserRoles);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const deleteConnection = async () => {
    try {
      const connectionData = generateConnectionData([connectedStopPair.markedStop, connectedStopPair.connectedStop]);

      await api.connectionsRemoveCreate(connectionData, {
        headers: basicHeaders(),
      });
      setImportedConnections(oldConnections =>
        oldConnections.filter(
          c => c.gtfsStopId !== connectionData.gtfsStopId && c.osmStopId !== connectionData.osmStopId,
        ),
      );
      setIsSidebarConnectionHandlerVisible(false);
      setConnectedStopPair({ markedStop: null, connectedStop: null, connection: null });
      dispatch(NotificationActions.success(t('connection.deleteSuccessMessage')));
    } catch (error) {
      exception(error);
    }
  };

  return (
    <>
      <div className="sidebar-connection-handler bordered-wrapper">
        {activeStop && isSidebarConnectionHandlerVisible ? (
          <>
            <div className="sidebar-connection-handler__top">
              <fieldset>
                <legend>{t('connectionSidebarHandler.stopName')}</legend>

                {generateStopName(connectedStopPair?.markedStop) || t('connectionSidebarHandler.noStopName')}
              </fieldset>
              <fieldset>
                <legend>{t('connectionSidebarHandler.connectedWith')}</legend>

                {generateStopName(connectedStopPair?.connectedStop) || t('connectionSidebarHandler.noStopName')}
              </fieldset>
            </div>

            <div className="buttons">
              {connectedStopPair.connection && (
                <Button
                  variant="contained"
                  sx={authRoles?.includes(roles.SUPERVISOR) ? { flexGrow: 2 } : undefined}
                  onClick={() => {
                    deleteConnection();
                  }}>
                  {t('connectionSidebarHandler.deleteConnection')}
                </Button>
              )}
            </div>
          </>
        ) : (
          <p>{t('connectionSidebarHandler.placeholder')} </p>
        )}
      </div>
    </>
  );
};

export default SidebarConnectionHandler;
