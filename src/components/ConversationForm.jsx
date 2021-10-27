import React, {useContext} from 'react';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {NotificationActions} from '../redux/actions/notificationActions';
import {Button, Checkbox, FormControlLabel, Grid, TextareaAutosize} from '@mui/material';
import {MapContext} from './contexts/MapContextProvider';
import {ConversationContext} from './contexts/ConversationProvider';
import {basicHeaders} from '../config/apiConfig';
import api from '../api/apiInstance';
import {exception} from '../utilities/exceptionHelper';

const ConversationForm = ({lat, lon, isReportActive, conversation, handleLoader}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
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
      console.log('nope');
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

  return (
    <div>
      <form onSubmit={formik.handleSubmit} onChange={formik.handleChange} className="report__add-message">
        <div className="report__container">
          <TextareaAutosize
            minRows={3}
            className="report__form"
            placeholder="Your report..."
            id="reportText"
            onChange={formik.handleChange}
            value={formik.values.reportText}
            style={{marginBottom: 10}}
          />

          <Grid container justifyContent="space-between">
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox checked={formik.values.approveReport} disabled={!isReportActive} id="approveReport" />
                }
                size="small"
                label="Approve report"
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit">
                {t('report.button')}
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
};

export default ConversationForm;
