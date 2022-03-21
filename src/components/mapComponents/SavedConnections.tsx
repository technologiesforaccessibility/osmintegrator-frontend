import { FC, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Polyline, Popup, Tooltip } from 'react-leaflet';
import { useDispatch } from 'react-redux';

import { Connection, Stop } from '../../api/apiClient';
import api from '../../api/apiInstance';
import { basicHeaders } from '../../config/apiConfig';
import { NotificationActions } from '../../redux/actions/notificationActions';
import colors from '../../stylesheets/config/colors.module.scss';
import { StopType } from '../../types/enums';
import { exception } from '../../utilities/exceptionHelper';
import { generateConnectionData, getPosition } from '../../utilities/mapUtilities';
import { MapContext } from '../contexts/MapContextProvider';
import EditConnectionPopup from './EditConnectionPopup';

interface SavedConnectionsProps {
  stops: Stop[];
}

const SavedConnections: FC<SavedConnectionsProps> = ({ stops }) => {
  const popupRef = useRef(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    importedConnections,
    shouldRenderConnections,
    visibilityOptions,
    setConnectedStopPair,
    setIsSidebarConnectionHandlerVisible,
  } = useContext(MapContext);

  const checkStopType = (stopList: Stop[]) => {
    return stopList.map(stop => {
      return { ...stop, isOsm: stop.stopType === StopType.OSM };
    });
  };

  const deleteConnection = async (osm: Stop, gtfs: Stop) => {
    try {
      await api.connectionsRemoveCreate(generateConnectionData(checkStopType([osm, gtfs]), osm.tileId ?? gtfs.tileId), {
        headers: basicHeaders(),
      });
      shouldRenderConnections(true);
      setIsSidebarConnectionHandlerVisible(false);
      setConnectedStopPair({ markedStop: null, connectedStop: null, connection: null });
      dispatch(NotificationActions.success(t('connection.deleteSuccessMessage')));
    } catch (error) {
      exception(error);
    }
  };

  const closePopup = () => {
    if (popupRef.current) (popupRef.current as unknown as Record<string, () => void>)._close();
  };

  const getPathLineColor = (connection: Connection, gtfsStop: Stop, osmStop: Stop) => {
    if (connection.exported) {
      const osmRefTags = osmStop.tags?.filter(tag => tag.key === 'ref') ?? [];
      const osmRefTagValue = osmRefTags.length > 0 ? osmRefTags[0].value : null;

      return osmRefTagValue === gtfsStop.stopId?.toString()
        ? colors.colorConnectionExported
        : colors.colorConnectionMismatch;
    } else {
      return colors.colorConnectionCreated;
    }
  };

  return (
    <>
      {stops.length > 0 &&
        importedConnections
          .filter(({ id }) => !!id)
          .map((connection, index) => {
            const foundOSM = stops.find(stop => stop.id === connection.osmStopId);
            const foundGTFS = stops.find(stop => stop.id === connection.gtfsStopId);
            if (foundOSM && foundGTFS) {
              return (
                <Polyline
                  key={index}
                  pathOptions={{
                    color: getPathLineColor(connection, foundGTFS, foundOSM),
                    opacity: visibilityOptions.connected.value.opacityValue,
                  }}
                  pane="tooltipPane"
                  positions={getPosition(foundOSM, foundGTFS)}>
                  {
                    <>
                      <Tooltip direction="bottom">{t('connection.deleteConnectionInfo')}</Tooltip>
                      <Popup ref={popupRef} key={`popup_${index}`} closeButton={false}>
                        <EditConnectionPopup
                          closePopup={closePopup}
                          deleteConnection={deleteConnection}
                          gtfs={foundGTFS}
                          osm={foundOSM}
                        />
                      </Popup>
                    </>
                  }
                </Polyline>
              );
            }
            return <></>;
          })}
    </>
  );
};

export default SavedConnections;
