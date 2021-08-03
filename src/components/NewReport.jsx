import React, {useState, useContext, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useFormik} from 'formik';

import CustomBlockButton from './customs/CustomBlockButton';
import api from '../api/apiInstance';
import {basicHeaders} from '../config/apiConfig';
import {MapContext} from './contexts/MapContextProvider';

import '../stylesheets/newReport.scss';
import buttonStyle from '../stylesheets/modules/mapPanelButton.module.scss';
import colors from '../stylesheets/config/colors.module.scss';

const NewReport = () => {
  const {t} = useTranslation();
  const {newReportCoordinates, resetReportCoordinates, activeTile, setRerenderReports} = useContext(MapContext);
  const {lat, lon} = newReportCoordinates;
  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState('black');

  useEffect(() => {
    return () => {
      resetCurrentReport();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetCurrentReport = () => {
    resetReportCoordinates();
    formik.resetForm();
  };

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
      await api.notesCreate(
        {lat, lon, text, tileId: activeTile.id},
        {
          headers: basicHeaders(),
        },
      );
      setMessageColor(colors.colorMessageSuccess);
      setMessage(t('report.success'));
      resetReportCoordinates();
      formik.resetForm();
      setRerenderReports(true);
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
          onClickHandler={() => {}}
        />
        <CustomBlockButton
          buttonTitle={t('report.clear')}
          style={buttonStyle}
          type="button"
          onClickHandler={() => resetCurrentReport()}
        />
        {message && <p style={{color: messageColor}}>{message}</p>}
      </div>
    </form>
  );
};

export default NewReport;
