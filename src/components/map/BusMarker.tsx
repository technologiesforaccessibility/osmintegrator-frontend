import { Stop } from 'api/apiClient';
import api from 'api/apiInstance';
import { UserContext } from 'components/contexts/UserContextProvider';
import { basicHeaders } from 'config/apiConfig';
import { LatLngLiteral, LeafletEvent, LeafletMouseEvent } from 'leaflet';
import { FC, useContext, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Marker, Tooltip } from 'react-leaflet';
import { NotificationActions } from 'redux/actions/notificationActions';
import { useAppDispatch } from 'redux/store';
import { ConnectionRadio, MovedStopActionType, StopType } from 'types/enums';
import { TBusStopProperties } from 'types/stops';
import { exception } from 'utilities/exceptionHelper';
import { MapModes } from 'utilities/MapContextState';
import { generateStopName } from 'utilities/mapUtilities';
import { areCoordinatesOnTile, getBusStopIcon } from 'utilities/utilities';

import { MapContext } from '../contexts/MapContextProvider';

type TBusMarkerProps = {
  busStop: Stop;
  isConnectionMode: boolean;
  createConnection: (stop: Stop) => void;
  isViewMode: boolean;
  isActiveStopClicked: (stopId: string) => boolean;
  clickBusStop: (stop?: Stop) => void;
  isReportMode: boolean;
  isPanMode: boolean;
};

const BusMarker: FC<TBusMarkerProps> = ({
  busStop,
  isConnectionMode,
  createConnection,
  isViewMode,
  isActiveStopClicked,
  clickBusStop,
  isReportMode,
  isPanMode,
}) => {
  const {
    visibilityOptions,
    connectedStopIds,
    setIsSidebarConnectionHandlerVisible,
    setConnectedStopPair,
    importedConnections,
    tileStops,
    setTileStops,
    activeTile,
    activeStop,
    setActiveStop,
    setNewReportCoordinates,
    connectionData,
    connectionRadio,

    movedStops,
    markerReference,
    draggableStopId,
    setDraggableStopId,
    movedStopsDispatch,
    setMarkerReference,
    mapMode,
  } = useContext(MapContext);
  const { setLoader } = useContext(UserContext);

  const markerRef = useRef(null);
  const { lat, lon, id, stopId } = busStop;

  const originalCoordinates: LatLngLiteral = useMemo(() => ({ lat: lat ?? 0, lng: lon ?? 0 }), [lat, lon]);
  const [markerPosition, setMarkerPosition] = useState<LatLngLiteral>(originalCoordinates);
  const currentMovedStop = movedStops.find(item => item.id === activeStop?.id);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const opacity = useMemo(() => {
    if (connectedStopIds.includes(id ?? '')) {
      return visibilityOptions.connected.value.opacityValue;
    }
    return visibilityOptions.unconnected.value.opacityValue;
  }, [visibilityOptions, id, connectedStopIds]);

  const handleViewModeStopClick = (stop: Stop) => {
    clickBusStop(stop);
    if (connectedStopIds.includes(stop.id ?? '')) {
      const connection =
        stop.stopType === StopType.OSM
          ? importedConnections.find(conn => conn.osmStopId === stop.id)
          : importedConnections.find(conn => conn.gtfsStopId === stop.id);
      if (stop.stopType === StopType.OSM) {
        const gtfsStop = tileStops.find(tileStop => tileStop.id === connection?.gtfsStopId);
        setConnectedStopPair({
          markedStop: stop,
          connectedStop: gtfsStop,
          connection: { id: connection?.id },
        });
      } else {
        const osmStop = tileStops.find(tileStop => tileStop.id === connection?.osmStopId);
        setConnectedStopPair({
          markedStop: stop,
          connectedStop: osmStop,
          connection: { id: connection?.id },
        });
      }
      setIsSidebarConnectionHandlerVisible(true);
    } else {
      setIsSidebarConnectionHandlerVisible(false);
      setConnectedStopPair({ markedStop: null, connectedStop: null, connection: null });
    }
  };

  const handleViewModeStopUnclick = () => {
    clickBusStop();
    setIsSidebarConnectionHandlerVisible(false);
    setConnectedStopPair({ markedStop: null, connectedStop: null, connection: null });
  };

  const getIcon = (stop: Stop) => {
    if (isViewMode || isReportMode || isPanMode) {
      return getBusStopIcon(stop as TBusStopProperties, isActiveStopClicked(stop.id ?? ''));
    } else if (isConnectionMode) {
      const activeStopWithConnection = connectionData.filter(connection => connection.id === stop.id);
      return getBusStopIcon(
        stop as TBusStopProperties,
        activeStopWithConnection.length > 0 ||
          (isActiveStopClicked(stop.id ?? '') && activeStopWithConnection.length === 0),
      );
    } else {
      return getBusStopIcon(stop as TBusStopProperties, false);
    }
  };

  const updatePosition = async (data: { lat: number; lon: number; stopId: string }) => {
    try {
      setLoader(true);
      await api.stopChangePositionUpdate(data, { headers: basicHeaders() });
      dispatch(NotificationActions.success(t('pan.stopWasMoved')));

      const newTileStops = [...tileStops];
      newTileStops.forEach(stop => {
        if (stop.id === data.stopId) {
          if (!stop.initLat && !stop.initLon) {
            stop.initLat = stop.lat;
            stop.initLon = stop.lon;
          }
          stop.lat = data.lat;
          stop.lon = data.lon;
        }
      });
      setTileStops(newTileStops);
    } catch (error) {
      exception(error);
    } finally {
      setLoader(false);
    }
  };

  const checkIfDraggable = (stop: Stop) => {
    if (stop.stopType !== StopType.GTFS) return false;

    return mapMode === MapModes.pan && draggableStopId === stop.id;
  };

  const handleClick = (event: LeafletEvent) => {
    const mouseEvent = event as LeafletMouseEvent;

    setActiveStop(busStop);
    setDraggableStopId(busStop.id ?? '');
    setMarkerReference(markerRef.current);
    setNewReportCoordinates({ lat: null, lon: null });

    if (isConnectionMode) {
      if (connectionRadio === ConnectionRadio.ADD) {
        createConnection(busStop);
      } else if (connectionRadio === ConnectionRadio.EDIT) {
        if (isActiveStopClicked(busStop.id ?? '')) {
          handleViewModeStopUnclick();
        } else {
          handleViewModeStopClick(busStop);
        }
      }
    }

    if (
      isViewMode ||
      isReportMode ||
      (isPanMode && mouseEvent.coordinates.lat === activeStop?.lat && mouseEvent.coordinates.lon === activeStop.lon)
    ) {
      if (isActiveStopClicked(busStop.id ?? '')) {
        clickBusStop();
      } else {
        clickBusStop(busStop);
      }
    }
  };

  const handleDragEnd = () => {
    const currentMarker = markerRef.current as unknown as { getLatLng: () => LatLngLiteral };
    if (!!currentMarker) setMarkerPosition(currentMarker.getLatLng());

    const coordinates = currentMarker.getLatLng();

    if (!areCoordinatesOnTile(coordinates.lat, coordinates.lng, activeTile!)) {
      movedStopsDispatch({
        type: MovedStopActionType.REMOVE,
        payload: {
          id: activeStop?.id!,
          externalId: activeStop?.stopId!,
        },
      });

      let newLat = 0,
        newLng = 0;

      if (!currentMovedStop) {
        newLat = activeStop?.lat!;
        newLng = activeStop?.lon!;
      } else {
        newLat = currentMovedStop?.position?.lat!;
        newLng = currentMovedStop?.position?.lng!;
      }

      const marker = markerReference as unknown as { setLatLng: (coordinates: { lat: number; lng: number }) => void };
      if (marker) {
        marker.setLatLng({
          lat: newLat,
          lng: newLng,
        });
        movedStopsDispatch({
          type: MovedStopActionType.ADD,
          payload: { id: id ?? '', externalId: stopId ?? 0, position: { lat: newLat, lng: newLng } },
        });
      }

      dispatch(NotificationActions.warning(t('pan.stopCannotBeMovedOutsideOfTile')));
    } else {
      movedStopsDispatch({
        type: MovedStopActionType.ADD,
        payload: { id: id ?? '', externalId: stopId ?? 0, position: coordinates },
      });
      updatePosition({ stopId: id ?? '', lat: coordinates.lat, lon: coordinates.lng });
    }
  };

  return (
    <Marker
      key={busStop.id}
      ref={markerRef}
      draggable={checkIfDraggable(busStop)}
      position={markerPosition}
      icon={getIcon(busStop)}
      riseOnHover={true}
      opacity={opacity}
      pane="shadowPane"
      shadowPane="markerPane"
      zIndexOffset={isActiveStopClicked(busStop.id ?? '') ? 1000 : 0}
      eventHandlers={{
        click: handleClick,
        dragend: handleDragEnd,
      }}>
      <Tooltip direction="bottom">{generateStopName(busStop)}</Tooltip>
    </Marker>
  );
};

export default BusMarker;
