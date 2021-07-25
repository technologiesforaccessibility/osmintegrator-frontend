import React, {useState, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {useFormik} from 'formik';

import CustomBlockButton from './customs/CustomBlockButton';
import client from '../api/apiInstance';
import {basicHeaders} from '../config/apiConfig';
import {MapContext} from './contexts/MapContextProvider';

import '../stylesheets/newReport.scss';
import buttonStyle from '../stylesheets/modules/mapPanelButton.module.scss';
import colors from '../stylesheets/config/colors.module.scss';

const NewReport = () => {
  const {t} = useTranslation();
  const {newReportCoordinates, reportSuccess} = useContext(MapContext);
  const {lat, lon} = newReportCoordinates;
  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState('black');

  const formik = useFormik({
    initialValues: {
      reportText: '',
    },
    onSubmit: ({reportText}) => {
      sendReport(reportText);
    },
  });

  const sendReport = async text => {
    try {
      await client.api.notesCreate(
        {lat, lon, text},
        {
          headers: basicHeaders(),
        },
      );
      setMessageColor(colors.colorMessageSuccess);
      setMessage(t('report.success'));
      reportSuccess();
      formik.resetForm();
    } catch (error) {
      setMessageColor(colors.colorMessageFail);
      setMessage(t('report.fail'));
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="report__container">
        <textarea
          className="report__form"
          placeholder="Your report..."
          id="reportText"
          onChange={formik.handleChange}
          value={formik.values.reportText}
        />
        <CustomBlockButton
          buttonTitle={t('report.button')}
          style={buttonStyle}
          type="submit"
          onClickHandler={() => {
            sendReport();
          }}
        />
        {message && <p style={{color: messageColor}}>{message}</p>}
      </div>
    </form>
  );
};

export default NewReport;
