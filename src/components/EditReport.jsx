import React, {useState, useContext} from 'react';
import {useTranslation} from 'react-i18next';

import CustomBlockButton from './customs/CustomBlockButton';
import api from '../api/apiInstance';
import {basicHeaders} from '../config/apiConfig';
import {MapContext} from './contexts/MapContextProvider';

import '../stylesheets/newReport.scss';
import buttonStyle from '../stylesheets/modules/mapPanelButton.module.scss';
import colors from '../stylesheets/config/colors.module.scss';

const EditReport = () => {
  const {t} = useTranslation();

  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState('black');

  const {openReport, setOpenReport} = useContext(MapContext);

  const {text, id} = openReport;

  const approveReport = async () => {
    try {
      await api.notesApproveUpdate({id}, {headers: basicHeaders()});
      setMessageColor(colors.colorMessageSuccess);
      setMessage(t('report.approved'));
      setOpenReport(null);
    } catch (error) {
      console.log(error);
      setMessageColor(colors.colorMessageFail);
      setMessage(t('report.fail'));
    }
  };

  const declineReport = async () => {
    try {
      await api.notesDelete({id}, {headers: basicHeaders()});
      setMessageColor(colors.colorMessageSuccess);
      setMessage(t('report.closed'));
      setOpenReport(null);
    } catch (error) {
      console.log(error);
      setMessageColor(colors.colorMessageFail);
      setMessage(t('report.fail'));
    }
  };

  return (
    <div className="report__container">
      {openReport && (
        <>
          <p className="report__form">{text}</p>
          <CustomBlockButton
            buttonTitle={t('report.approve')}
            style={buttonStyle}
            type="button"
            onClickHandler={() => {
              approveReport();
            }}
          />
          <CustomBlockButton
            buttonTitle={t('report.decline')}
            style={buttonStyle}
            type="button"
            onClickHandler={() => {
              declineReport();
            }}
          />
        </>
      )}
      {message && <p style={{color: messageColor}}>{message}</p>}
    </div>
  );
};

export default EditReport;
