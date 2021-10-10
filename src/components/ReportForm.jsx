import {useContext} from 'react';
import PropTypes, {bool} from 'prop-types';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import CustomBlockButton from './customs/CustomBlockButton';
import api from '../api/apiInstance';
import {basicHeaders} from '../config/apiConfig';
import {MapContext} from './contexts/MapContextProvider';
import {NotificationActions} from '../redux/actions/notificationActions';
import ReportTextInput from './ReportTextInput';
import ReportInfo from './ReportInfo';
import {exception} from '../utilities/exceptionHelper';

import buttonStyle from '../stylesheets/modules/mapPanelButton.module.scss';
import '../stylesheets/newReport.scss';

const ReportForm = ({areManageReportButtonsVisible}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {openReportContent, setOpenReportContent, setRerenderReports} = useContext(MapContext);

  const {text, id, status} = openReportContent;

  const approveReport = async () => {
    try {
      await api.notesApproveUpdate(id, {headers: basicHeaders()});
      dispatch(NotificationActions.success(t('report.approved')));
      setOpenReportContent(null);
      setRerenderReports(true);
    } catch (error) {
      exception(error);
    }
  };

  const declineReport = async () => {
    try {
      await api.notesRejectUpdate(id, {headers: basicHeaders()});
      dispatch(NotificationActions.success(t('report.closed')));
      setOpenReportContent(null);
      setRerenderReports(true);
    } catch (error) {
      exception(error);
    }
  };

  return (
    <div className="report__container">
      {openReportContent && (
        <>
          <ReportTextInput text={text} classToPass={'report__form'} />
          {areManageReportButtonsVisible &&
            (status === 0 ? (
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
              <ReportInfo text={t('report.approveInfo')} />
            ) : (
              <ReportInfo text={t('report.rejectInfo')} />
            ))}
        </>
      )}
    </div>
  );
};

PropTypes.ReportForm = {
  areManageReportButtonsVisible: bool.isRequired,
};
export default ReportForm;
