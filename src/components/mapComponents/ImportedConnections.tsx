import {FC, useContext, useMemo, useRef} from 'react';
import {Polyline, Tooltip, Popup} from 'react-leaflet';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {generateConnectionData, getPosition} from '../../utilities/mapUtilities';
import api from '../../api/apiInstance';
import {Stop} from '../../api/apiClient';
import {basicHeaders} from '../../config/apiConfig';
import EditConnectionPopup from './EditConnectionPopup';
import {NotificationActions} from '../../redux/actions/notificationActions';

import colors from '../../stylesheets/config/colors.module.scss';
import {exception} from '../../utilities/exceptionHelper';

import UnapproveConnectionPopup from './UnapproveConnectionPopup';
import {MapContext} from '../contexts/MapContextProvider';

interface ImportedConnectionsProps {
  stops: Array<Stop>;
  inApproveMode: boolean;
}

const ImportedConnections: FC<ImportedConnectionsProps> = ({stops, inApproveMode}) => {
  const popupRef = useRef(null);
  const unapproveRef = useRef(null);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {importedConnections, shouldRenderConnections, visibilityOptions} = useContext(MapContext);

  const checkStopType = (stopList: Array<Stop>) => {
    return stopList.map(stop => {
      return {...stop, isOsm: stop.stopType === 0};
    });
  };

  const deleteConnection = async (osm: Stop, gtfs: Stop) => {
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

  const approveConnection = async (id: string) => {
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

  const unapproveConnection = async (id: string) => {
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
    popupRef.current && (popupRef.current as unknown as Record<string, () => void>)._close();
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
        connections
          .filter(({id}) => !!id)
          .map(({osmStopId, gtfsStopId, approved, id}, index) => {
            const foundOSM = stops.find(stop => stop.id === osmStopId);
            const foundGTFS = stops.find(stop => stop.id === gtfsStopId);
            if (foundOSM !== undefined && foundGTFS !== undefined) {
              return (
                <Polyline
                  key={index}
                  pathOptions={{
                    color: approved ? colors.colorApprovedBySupervisor : colors.colorConnectionImported,
                    opacity: approved
                      ? visibilityOptions.approved.value.opacityValue
                      : visibilityOptions.connected.value.opacityValue,
                  }}
                  pane="markerPane"
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
                          approveConnection={(inApproveMode && (() => id && approveConnection(id))) || null}
                        />
                      </Popup>
                    </>
                  )) ||
                    (inApproveMode && (
                      <>
                        <Tooltip direction="bottom">{t('connection.unapproveConnectionInfo')}</Tooltip>
                        <Popup ref={unapproveRef} key={`popup_${index}`} closeButton={false}>
                          <UnapproveConnectionPopup
                            closePopup={() =>
                              (unapproveRef.current &&
                                (unapproveRef.current as unknown as Record<string, () => void>)._close()) ||
                              null
                            }
                            unapproveConnection={() => id && unapproveConnection(id)}
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
