import {useContext, useMemo, useRef} from 'react';
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

import UnapproveConnectionPopup from './UnapproveConnectionPopup';
import {MapContext} from '../contexts/MapContextProvider';

const ImportedConnections = ({stops, inApproveMode}) => {
  const popupRef = useRef(null);
  const unapproveRef = useRef(null);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {importedConnections, shouldRenderConnections, visibilityOptions} = useContext(MapContext);

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

  const unapproveConnection = async id => {
    try {
      await api.connectionsUnapproveUpdate(id, {
        headers: basicHeaders(),
      });
      shouldRenderConnections(true);
      dispatch(NotificationActions.success(t('connection.unapproveSuccessMessage')));
    } catch (error) {
      exception(error);
    }
  };

  const closePopup = () => {
    popupRef.current && popupRef.current._close();
  };

  const connections = useMemo(
    () =>
      importedConnections.filter(
        connection =>
          (connection.approved && visibilityOptions.approved.value.opacityValue) ||
          (!connection.approved && visibilityOptions.connected.value.opacityValue),
      ),
    [importedConnections, visibilityOptions],
  );

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
                  opacity: approved
                    ? visibilityOptions.approved.value.opacityValue
                    : visibilityOptions.connected.value.opacityValue,
                }}
                positions={getPosition(foundOSM, foundGTFS)}>
                {(!approved && (
                  <>
                    <Tooltip direction="bottom">
                      {(inApproveMode && t('connection.editConnectionInfo')) || t('connection.deleteConnectionInfo')}
                    </Tooltip>
                    <Popup ref={popupRef} key={`popup_${index}`} closeButton={false}>
                      <EditConnectionPopup
                        closePopup={closePopup}
                        deleteConnection={deleteConnection}
                        gtfs={foundGTFS}
                        osm={foundOSM}
                        approveConnection={(inApproveMode && (() => approveConnection(id))) || null}
                      />
                    </Popup>
                  </>
                )) ||
                  (inApproveMode && (
                    <>
                      <Tooltip direction="bottom">{t('connection.unapproveConnectionInfo')}</Tooltip>
                      <Popup ref={unapproveRef} key={`popup_${index}`} closeButton={false}>
                        <UnapproveConnectionPopup
                          closePopup={() => (unapproveRef.current && unapproveRef.current._close()) || null}
                          unapproveConnection={() => unapproveConnection(id)}
                        />
                      </Popup>
                    </>
                  ))}
              </Polyline>
            );
          }
          return <></>;
        })}
    </>
  );
};

export default ImportedConnections;
