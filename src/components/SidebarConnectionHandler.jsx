import {useContext} from 'react';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import api from '../api/apiInstance';
import {generateConnectionData} from '../utilities/mapUtilities';
import {basicHeaders} from '../config/apiConfig';
import {MapContext} from './contexts/MapContextProvider';
import {NotificationActions} from '../redux/actions/notificationActions';
import {selectLoggedInUserRoles} from './../redux/selectors/authSelector';
import {exception} from '../utilities/exceptionHelper';
import {roles} from '../utilities/constants';

import '../stylesheets/sidebarConnectionHandler.scss';

const SidebarConnectionHandler = () => {
  const {
    connectedStopPair,
    shouldRenderConnections,
    setIsSidebarConnectionHandlerVisible,
    setConnectedStopPair,
    isSidebarConnectionHandlerVisible,
    activeStop,
  } = useContext(MapContext);
  const authRoles = useSelector(selectLoggedInUserRoles);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const deleteConnection = async () => {
    try {
      const connectionData = generateConnectionData([connectedStopPair.markedStop, connectedStopPair.connectedStop]);

      await api.connectionsRemoveCreate(connectionData, {
        headers: basicHeaders(),
      });
      shouldRenderConnections(true);
      setIsSidebarConnectionHandlerVisible(false);
      setConnectedStopPair({markedStop: null, connectedStop: null, connection: null});
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

                {connectedStopPair.markedStop.name || t('connectionSidebarHandler.noStopName')}
              </fieldset>
              <fieldset>
                <legend>{t('connectionSidebarHandler.connectedWith')}</legend>

                {connectedStopPair.connectedStop.name || t('connectionSidebarHandler.noStopName')}
              </fieldset>
            </div>

            <div className="buttons">
              {connectedStopPair.connection && (
                <Button
                  variant="contained"
                  sx={authRoles.includes(roles.SUPERVISOR) && {flexGrow: '2'}}
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
