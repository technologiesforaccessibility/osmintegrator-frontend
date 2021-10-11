import {useContext} from 'react';
import PropTypes, {shape, string, number} from 'prop-types';
import {Marker, Tooltip} from 'react-leaflet';
import {useSelector} from 'react-redux';

import {selectLoggedInUserRoles} from '../../redux/selectors/authSelector';
import {getReportIcon} from '../../utilities/utilities';
import {roles} from '../../utilities/constants';
import {MapContext} from '../contexts/MapContextProvider';

const ImportedReports = ({reports}) => {
  const authRoles = useSelector(selectLoggedInUserRoles);
  const {
    setOpenReportContent,
    isViewMode,
    openReportContent,
    displayPropertyGrid,
    setAreManageReportButtonsVisible,
    setIsEditingReportMode,
  } = useContext(MapContext);

  const handleReportClick = (lat, lon, text, id, tileId, status) => {
    if (isViewMode) {
      if (openReportContent && openReportContent.id === id) {
        setOpenReportContent(null);
        setAreManageReportButtonsVisible(false);
      } else {
        setOpenReportContent({lat, lon, text, id, tileId, status});
        displayPropertyGrid(null);
        setIsEditingReportMode(true);
        if (authRoles.some(role => [roles.ADMIN, roles.COORDINATOR, roles.SUPERVISOR].includes(role))) {
          setAreManageReportButtonsVisible(true);
        } else {
          setAreManageReportButtonsVisible(false);
        }
      }
    }
  };

  return (
    <>
      {reports.map(({lat, lon, text, id, tileId, status}, index) => (
        <Marker
          key={index}
          position={[lat, lon]}
          icon={getReportIcon(status)}
          eventHandlers={{
            click: () => {
              handleReportClick(lat, lon, text, id, tileId, status);
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
