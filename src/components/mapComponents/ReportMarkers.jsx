import React from 'react';
import {Marker, Popup, Tooltip} from 'react-leaflet';
import {getReportIcon} from "../../utilities/utilities";
import Toolbar from "../Toolbar";

const ReportMarkers = ({reportMarkers, activeReportMarker}) => {

    console.log(activeReportMarker)
  return (
    <>
      {reportMarkers.map(({lat, lng}, index) => (
        <Marker key={index}
            position={[lat,lng]}
            icon={getReportIcon()}
        >
            <Tooltip>
                {lat}, {lng}
            </Tooltip>
            {activeReportMarker === {lat, lng} && <Popup key={index} >
                <input/>
            </Popup> }

        </Marker>
      ))}
      )
    </>
  );
};

export default ReportMarkers;
