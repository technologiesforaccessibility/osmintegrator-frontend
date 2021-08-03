import React, {useContext} from 'react';
import {Marker, Tooltip} from 'react-leaflet';
import {useSelector} from 'react-redux';

import {selectLoggedInUserRoles} from '../../redux/selectors/authSelector';
import {getReportIcon} from '../../utilities/utilities';
import {roles} from '../../utilities/constants';
import {MapContext} from '../contexts/MapContextProvider';

const ImportedReports = ({reports}) => {
  const authRoles = useSelector(selectLoggedInUserRoles);
  const {setIsEditingReportMode, setOpenReport, isViewMode, openReport} = useContext(MapContext);

  return (
    <>
      {reports.map(({lat, lon, text, id, tileId, status}) => (
        <Marker
          position={[lat, lon]}
          icon={getReportIcon(status)}
          eventHandlers={{
            click: () => {
              if (
                authRoles.some(role => [roles.ADMIN, roles.COORDINATOR, roles.SUPERVISOR].includes(role)) &&
                isViewMode
              ) {
                if (openReport && openReport.id === id) {
                  setOpenReport(null);
                } else {
                  setIsEditingReportMode(true);
                  setOpenReport({lat, lon, text, id, tileId, status});
                }
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
