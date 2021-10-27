import {Button, Chip} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import '../stylesheets/conversationHeading.scss';
const ConversationHeading = ({lat, lon, activeStop, isReportActive, handleCloseReport}) => {
  return (
    <div className="conversation-heading bordered-wrapper">
      <div className="conversation-heading__top">
        <fieldset>
          <legend>{activeStop ? 'Nazwa przystanku:' : lat || lon ? 'Współrzędne raportu' : null}</legend>

          {activeStop
            ? `${activeStop.name} ${activeStop.number}`
            : lat || lon
            ? `${lat.toString().slice(0, 6)}N, ${lon.toString().slice(0, 6)}E`
            : null}
        </fieldset>

        <button className="conversation-heading__close">
          <CloseIcon color="primary" />
        </button>
      </div>

      <div className="conversation-heading__status">
        <span>Status raportu: </span>
        <Chip
          sx={{borderRadius: '5px', textTransform: 'uppercase', fontWeight: 700, marginLeft: '0.625rem'}}
          label={isReportActive ? 'Active' : 'Inactive'}
          size="medium"
          variant="outlined"
          color={isReportActive ? 'error' : 'success'}
        />{' '}
      </div>
    </div>
  );
};

export default ConversationHeading;
