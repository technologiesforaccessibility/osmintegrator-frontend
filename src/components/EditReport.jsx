import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import CustomBlockButton from './customs/CustomBlockButton';
import api from '../api/apiInstance';
import {basicHeaders} from '../config/apiConfig';
import {MapContext} from './contexts/MapContextProvider';
import {NotificationActions} from '../redux/actions/notificationActions';

import buttonStyle from '../stylesheets/modules/mapPanelButton.module.scss';
import { exception } from '../utilities/exceptionHelper';

import '../stylesheets/newReport.scss';

const EditReport = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {openReport, setOpenReport, setRerenderReports} = useContext(MapContext);

  const {text, id, status} = openReport;

  const approveReport = async () => {
    try {
      await api.notesApproveUpdate(id, {headers: basicHeaders()});
      dispatch(NotificationActions.success(t('report.approved')));
      setOpenReport(null);
      setRerenderReports(true);
    } catch (error) {
      exception(error);
    }
  };

  const declineReport = async () => {
    try {
      await api.notesRejectUpdate(id, {headers: basicHeaders()});
      dispatch(NotificationActions.success(t('report.closed')));
      setOpenReport(null);
      setRerenderReports(true);
    } catch (error) {
      exception(error);
    }
  };

  return (
    <div className="report__container">
      {openReport && (
        <>
          <p className="report__form">{text}</p>
          {status === 0 ? (
            <>
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
          ) : status === 1 ? (
            <p>{t('report.approveInfo')}</p>
          ) : (
            <p>{t('report.rejectInfo')}</p>
          )}
        </>
      )}
    </div>
  );
};

export default EditReport;
