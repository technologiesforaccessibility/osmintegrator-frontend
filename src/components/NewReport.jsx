import {useContext, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';

import CustomBlockButton from './customs/CustomBlockButton';
import api from '../api/apiInstance';
import {basicHeaders} from '../config/apiConfig';
import {MapContext} from './contexts/MapContextProvider';
import {NotificationActions} from '../redux/actions/notificationActions';
import buttonStyle from '../stylesheets/modules/mapPanelButton.module.scss';
import {exception} from '../utilities/exceptionHelper';

import '../stylesheets/newReport.scss';

const NewReport = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {newReportCoordinates, resetReportCoordinates, activeTile, setRerenderReports} = useContext(MapContext);
  const {lat, lon} = newReportCoordinates;

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
    if (lat === null || lon === null) {
      dispatch(NotificationActions.error(t('report.noPinFound')));
      return;
    }
    if (!text) {
      dispatch(NotificationActions.error(t('report.noTextFound')));
      return;
    }
    try {
      await api.notesCreate(
        {lat, lon, text, tileId: activeTile.id},
        {
          headers: basicHeaders(),
        },
      );
      dispatch(NotificationActions.success(t('report.success')));
      resetReportCoordinates();
      formik.resetForm();
      setRerenderReports(true);
    } catch (error) {
      exception(error);
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
      </div>
    </form>
  );
};

export default NewReport;
