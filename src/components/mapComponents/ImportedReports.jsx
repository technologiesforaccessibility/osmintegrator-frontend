import {useContext} from 'react';
import PropTypes, {shape, string, number} from 'prop-types';
import {Marker, Tooltip} from 'react-leaflet';

import {getReportIcon} from '../../utilities/utilities';
import {MapContext, MapModes} from '../contexts/MapContextProvider';

const ImportedReports = ({reports}) => {
  // const authRoles = useSelector(selectLoggedInUserRoles);
  const {mapMode, setNewReportCoordinates, setActiveStop, displayPropertyGrid} = useContext(MapContext);

  const handleReportClick = data => {
    if (mapMode === MapModes.view) {
      displayPropertyGrid(data);
    }
  };

  return (
    <>
      {reports.map(({lat, lon, id, tileId, messages}, index) => {
        const status = messages
          ? messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).at(-1).status
          : 99;
        return (
          <Marker
            key={index}
            position={[lat, lon]}
            icon={getReportIcon(status)}
            zIndexOffset={100}
            eventHandlers={{
              click: () => {
                handleReportClick({lat, lon, id, tileId, messages});
                setNewReportCoordinates({lat, lon});
                setActiveStop(null);
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
