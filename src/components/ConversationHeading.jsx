import React from 'react';

const ConversationHeading = ({lat, lon, activeStop, isReportActive}) => {
  return (
    <div className="report__info">
      <div className="report__heading">
        <span className="report__heading-type">{activeStop ? 'Stop' : lat || lon ? 'Report' : ''}</span>
        <br />
        {activeStop && (
          <b className="report__heading-name">
            {activeStop.name} {activeStop.number}
          </b>
        )}
        {lat && lon && !activeStop && (
          <b>
            {lat.toString().slice(0, 6)}N, {lon.toString().slice(0, 6)}E
          </b>
        )}
        <br />
        <br />
      </div>

      <div className="report__status">
        <p>Report state: {isReportActive ? 'Active' : 'Inactive'}</p>
      </div>
    </div>
  );
};

export default ConversationHeading;
