import React, {useContext} from 'react';
import {Marker, Tooltip} from 'react-leaflet';
import {useSelector} from 'react-redux';

import {selectLoggedInUserRoles} from '../../redux/selectors/authSelector';
import {getReportIcon} from '../../utilities/utilities';
import {roles} from '../../utilities/constants';
import {MapContext} from '../contexts/MapContextProvider';

const ImportedReports = ({reports}) => {
  const role = useSelector(selectLoggedInUserRoles);

  const {setIsEditingReportMode, setOpenReport} = useContext(MapContext);

  return (
    <>
      {reports.map(({lat, lon, text, id, tileId}) => (
        <Marker
          position={[lat, lon]}
          icon={getReportIcon()}
          eventHandlers={{
            click: () => {
              if ([roles.ADMIN, roles.COORDINATOR, roles.SUPERVISOR].includes(...role)) {
                setIsEditingReportMode(true);
                setOpenReport({lat, lon, text, id, tileId});
                console.log(role);
              }
            },
          }}>
          <Tooltip direction="top" offset={[0, -55]}>
            {text}
          </Tooltip>
        </Marker>
      ))}
    </>
  );
};

export default ImportedReports;
