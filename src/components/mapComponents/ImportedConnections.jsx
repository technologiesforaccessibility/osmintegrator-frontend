import {Fragment, useRef} from 'react';
import {Polyline, Tooltip, Popup} from 'react-leaflet';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {generateConnectionData, getPosition} from '../../utilities/mapUtilities';
import api from '../../api/apiInstance';
import {basicHeaders} from '../../config/apiConfig';
import DeleteConnectionPopup from './DeleteConnectionPopup';
import {NotificationActions} from '../../redux/actions/notificationActions';

import colors from '../../stylesheets/config/colors.module.scss';

const ImportedConnections = ({stops, importedConnections, shouldRenderConnections}) => {
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
      dispatch(NotificationActions.error(error.errors.message & error.errors.message[0] ? error.errors.message[0] : t('unrecognizedProblem')));
    }
  };

  const closePopup = () => {
    popupRef.current._close();
  };

  return (
    <Fragment>
      {stops.length > 0 &&
        importedConnections.map(({osmStopId, gtfsStopId}, index) => {
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
                <Tooltip direction="bottom">{t('connection.deleteConnectionInfo')}</Tooltip>
                <Popup ref={popupRef} key={index} closeButton={false}>
                  <DeleteConnectionPopup
                    closePopup={closePopup}
                    deleteConnection={deleteConnection}
                    gtfs={foundGTFS}
                    osm={foundOSM}
                  />
                </Popup>
              </Polyline>
            );
          }
          return <></>;
        })}
    </Fragment>
  );
};

export default ImportedConnections;
