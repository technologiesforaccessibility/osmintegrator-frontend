import 'stylesheets/conversationHeading.scss';

import CloseIcon from '@mui/icons-material/Close';
import { Chip } from '@mui/material';
import { Stop } from 'api/apiClient';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

type TConversationHeadingProps = {
  lat: number;
  lon: number;
  activeStop: Stop;
  isReportActive: boolean;
  handleCloseReport: () => void;
};

const ConversationHeading: FC<TConversationHeadingProps> = ({
  lat,
  lon,
  activeStop,
  isReportActive,
  handleCloseReport,
}) => {
  const { t } = useTranslation();
  return (
    <div className="conversation-heading bordered-wrapper">
      <div className="conversation-heading__top">
        <fieldset>
          <legend>{activeStop ? t('report.stopName') : lat || lon ? t('report.coordinatesName') : null}</legend>

          {activeStop
            ? `${activeStop.name} ${activeStop.number ? activeStop.number : ''}`
            : lat || lon
            ? `${lat.toString().slice(0, 6)}N, ${lon.toString().slice(0, 6)}E`
            : null}
        </fieldset>

        <button className="conversation-heading__close" onClick={handleCloseReport}>
          <CloseIcon color="primary" />
        </button>
      </div>

      <div className="conversation-heading__status">
        <span>{t('report.status')}</span>
        <Chip
          sx={{ borderRadius: '5px', textTransform: 'uppercase', fontWeight: 700, marginLeft: '0.625rem' }}
          label={isReportActive ? t('report.active') : t('report.inactive')}
          size="medium"
          variant="outlined"
          color={isReportActive ? 'error' : 'success'}
        />{' '}
      </div>
    </div>
  );
};

export default ConversationHeading;
