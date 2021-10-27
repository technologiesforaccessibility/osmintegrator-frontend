import React, {useContext} from 'react';
import api from '../api/apiInstance';
import {useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {selectLoggedInUserRoles} from '../redux/selectors/authSelector';
import {NotificationActions} from '../redux/actions/notificationActions';
import {MapContext} from './contexts/MapContextProvider';
import {ConversationContext} from './contexts/ConversationProvider';
import {basicHeaders} from '../config/apiConfig';
import {exception} from '../utilities/exceptionHelper';
import {roles} from '../utilities/constants';
import {Button, Checkbox, FormControlLabel, TextareaAutosize} from '@mui/material';
import '../stylesheets/conversationForm.scss';

const ConversationForm = ({lat, lon, isReportActive, conversation, handleLoader}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const authRoles = useSelector(selectLoggedInUserRoles);

  const {activeTile, setRerenderReports, activeStop} = useContext(MapContext);
  const {setReload} = useContext(ConversationContext);

  const formik = useFormik({
    initialValues: {
      reportText: '',
      approveReport: false,
    },

    onSubmit: ({reportText, approveReport}) => {
      if (activeStop === null && (lat === null || lon === null)) {
        dispatch(NotificationActions.error(t('report.noPinFound')));
        return;
      }

      if (!reportText) {
        dispatch(NotificationActions.error(t('report.noTextFound')));
        return;
      }

      if (conversation) {
        updateConversation(reportText, approveReport);
        return;
      }

      if (activeStop !== null) {
        createStopConversation(reportText);
        return;
      }

      if (lat !== null && lon !== null) {
        createGeoConversation(reportText);
        return;
      }
    },
  });

  const createStopConversation = async text => {
    handleLoader(true);
    try {
      const response = await api.conversationCreate(
        {text, stopId: activeStop.id, tileId: activeTile.id},
        {
          headers: basicHeaders(),
        },
      );
      dispatch(NotificationActions.success(t('report.success')));
      formik.resetForm();
      setReload(response.data);
    } catch (error) {
      exception(error);
    }
  };

  const createGeoConversation = async text => {
    handleLoader(true);
    try {
      const response = await api.conversationCreate(
        {text, lat, lon, tileId: activeTile.id},
        {
          headers: basicHeaders(),
        },
      );
      dispatch(NotificationActions.success(t('report.success')));
      formik.resetForm();
      setReload(response.data);
      setRerenderReports(true);
    } catch (error) {
      exception(error);
    }
  };

  const updateConversation = async (text, approve) => {
    const isApproveApi = approve ? 'conversationApproveUpdate2' : 'conversationCreate';
    handleLoader(true);
    try {
      const response = await api[isApproveApi](
        {conversationId: conversation.id, text, tileId: activeTile.id},
        {
          headers: basicHeaders(),
        },
      );
      dispatch(NotificationActions.success(t('report.success')));
      formik.resetForm();
      setReload(response.data);
    } catch (error) {
      exception(error);
    }
  };

  const isSupervisorOrAbove = () => {
    return (
      (authRoles || []).includes(roles.SUPERVISOR) ||
      (authRoles || []).includes(roles.COORDINATOR) ||
      (authRoles || []).includes(roles.ADMIN)
    );
  };

  return (
    <div className="conversation-form">
      <form onSubmit={formik.handleSubmit} onChange={formik.handleChange} className="report__add-message">
        <TextareaAutosize
          minRows={4}
          placeholder={t('report.placeholder')}
          className="conversation-form__textarea"
          id="reportText"
          onChange={formik.handleChange}
          value={formik.values.reportText}
        />

        <div className="conversation-form__bottom">
          {isSupervisorOrAbove() && (
            <FormControlLabel
              control={<Checkbox checked={formik.values.approveReport} disabled={!isReportActive} id="approveReport" />}
              size="small"
              label={t('report.approve')}
              onChange={formik.handleChange}
            />
          )}

          <Button variant="outlined" type="submit" className="conversation-form__submit">
            {t('report.button')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ConversationForm;
