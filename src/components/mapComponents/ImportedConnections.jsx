import {useRef} from 'react';
import {Polyline, Tooltip, Popup} from 'react-leaflet';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {generateConnectionData, getPosition} from '../../utilities/mapUtilities';
import api from '../../api/apiInstance';
import {basicHeaders} from '../../config/apiConfig';
import EditConnectionPopup from './EditConnectionPopup';
import {NotificationActions} from '../../redux/actions/notificationActions';

import colors from '../../stylesheets/config/colors.module.scss';
import {exception} from '../../utilities/exceptionHelper';

import {connectedStopVisibilityProps} from '../../utilities/constants';

const ImportedConnections = ({
  stops,
  importedConnections,
  shouldRenderConnections,
  connectedStopVisibility,
  unconnectedStopVisibility,
  inApproveMode
}) => {
  const popupRef = useRef(null);
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const checkStopType = stopList => {
    return stopList.map(stop => {
      return {...stop, isOsm: stop.stopType === 0};
    });
  };

  const deleteConnection = async (osm, gtfs) => {
    try {
      await api.connectionsDelete(generateConnectionData(checkStopType([osm, gtfs])), {
        headers: basicHeaders(),
      });
      shouldRenderConnections(true);
      dispatch(NotificationActions.success(t('connection.deleteSuccessMessage')));
    } catch (error) {
      exception(error);
    }
  };

  const approveConnection = async id => {
    try {
      await api.connectionsApproveUpdate(id, {
        headers: basicHeaders(),
      });
      shouldRenderConnections(true);
      dispatch(NotificationActions.success(t('connection.approveSuccessMessage')));
    } catch (error) {
      exception(error);
    }
  };

  const closePopup = () => {
    popupRef.current._close();
  };

  const connections = connectedStopVisibility === connectedStopVisibilityProps.hidden ? [] : importedConnections;

  return (
    <>
      {stops.length > 0 &&
        connections.map(({osmStopId, gtfsStopId, approved, id}, index) => {
          const foundOSM = stops.find(stop => stop.id === osmStopId);
          const foundGTFS = stops.find(stop => stop.id === gtfsStopId);
          if (foundOSM !== undefined && foundGTFS !== undefined) {
            return (
              <Polyline
                pane={'markerPane'}
                key={index}
                pathOptions={{
                  color: colors.colorConnectionImported,
                }}
                positions={getPosition(foundOSM, foundGTFS)}>
                {!approved && (
                  <>
                    <Tooltip direction="bottom">
                      {(inApproveMode && t('connection.editConnectionInfo')) || t('connection.deleteConnectionInfo')}
                    </Tooltip>
                    <Popup ref={popupRef} key={index} closeButton={false}>
                      <EditConnectionPopup
                        closePopup={closePopup}
                        deleteConnection={deleteConnection}
                        gtfs={foundGTFS}
                        osm={foundOSM}
                        approveConnection={(inApproveMode && (() => approveConnection(id))) || null}
                      />
                    </Popup>
                  </>
                )}
              </Polyline>
            );
          }
          return <></>;
        })}
    </>
  );
};

export default ImportedConnections;
