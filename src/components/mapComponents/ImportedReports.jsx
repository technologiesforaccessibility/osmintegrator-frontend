import { useContext } from 'react';
import PropTypes, { shape, string, number } from 'prop-types';
import { Marker, Tooltip } from 'react-leaflet';

import { getReportIcon } from '../../utilities/utilities';
import { MapContext, MapModes } from '../contexts/MapContextProvider';

const ImportedReports = ({ reports, resetActiveStop }) => {
  const {
    mapMode,
    newReportCoordinates,
    visibilityOptions,
    setNewReportCoordinates,
    setActiveStop,
    displayPropertyGrid,
  } = useContext(MapContext);

  const handleReportClick = data => {
    displayPropertyGrid(data);
  };

  const isActive = iconCord => {
    return JSON.stringify(iconCord) === JSON.stringify(newReportCoordinates);
  };

  return (
    <>
      {reports.map(({ lat, lon, id, tileId, messages, status }, index) => {
        return (
          <Marker
            key={index}
            position={[lat, lon]}
            icon={getReportIcon(status, isActive({ lat, lon }))}
            pane="markerPane"
            shadowPane="tooltipPane"
            opacity={visibilityOptions.mapReport.value.opacityValue}
            zIndexOffset={isActive({ lat, lon }) ? 1000 : 0}
            eventHandlers={{
              click: () => {
                if (mapMode !== MapModes.connection) {
                  setNewReportCoordinates({ lat, lon });
                  setActiveStop(null);
                  resetActiveStop();
                  if (isActive({ lat, lon }) && newReportCoordinates.lat && newReportCoordinates.lon) {
                    setNewReportCoordinates({ lat: null, lon: null });
                    handleReportClick(null);
                  } else {
                    handleReportClick({ lat, lon, id, tileId, messages });
                  }
                }
              },
            }}>
            <Tooltip direction="top" offset={[0, -55]}>
              {lat.toString().slice(0, 6)} {lon.toString().slice(0, 6)}
            </Tooltip>
          </Marker>
        );
      })}
    </>
  );
};

PropTypes.ImportedReports = {
  reports: shape({
    lat: number,
    lon: number,
    text: string,
    id: number,
    tileId: string,
    status: number,
  }),
};

export default ImportedReports;
