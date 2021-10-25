import {useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import api from '../api/apiInstance';
import {basicHeaders} from '../config/apiConfig';
import {MapContext} from './contexts/MapContextProvider';
import {NotificationActions} from '../redux/actions/notificationActions';
import {exception} from '../utilities/exceptionHelper';

import '../stylesheets/newReport.scss';
import {ConversationContext} from './contexts/ConversationProvider';
import ConversationMessage from './ConversationMessage';
import {Button, Checkbox, CircularProgress, FormControlLabel, Grid, TextareaAutosize} from '@mui/material';
import '../stylesheets/report.scss';
const NewReport = () => {
  const [loading, setLoading] = useState(false);
  const [isReportActive, setReportActive] = useState(false);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {newReportCoordinates, resetReportCoordinates, activeTile, setRerenderReports, activeStop} =
    useContext(MapContext);

  const {geoConversations, stopConversations, setUsers, users, setReload} = useContext(ConversationContext);
  const [conversation, setConversation] = useState(null);
  const {lat, lon} = newReportCoordinates;

  useEffect(() => {
    getStopConversation();
    if (loading) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStop, stopConversations]);

  useEffect(() => {
    getGeoConversation();

    if (loading) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newReportCoordinates, geoConversations]);

  useEffect(() => {
    getUsers();
    async function firstRender() {
      await getStopConversation();
    }
    firstRender();
    return () => {
      resetCurrentReport();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getGeoConversation() {
    const currentGeoConversation = geoConversations.filter(conv => conv.lat === lat && conv.lon === lon)[0];
    setConversation(currentGeoConversation);
    setReportActive(checkReportStatus(currentGeoConversation));
  }
  async function getStopConversation() {
    if (activeStop) {
      const currentStopConversation = stopConversations.filter(conv => conv.stopId === activeStop.id)[0];
      setConversation(currentStopConversation);
      setReportActive(checkReportStatus(currentStopConversation));
    }
  }

  const getUsers = async id => {
    try {
      const response = await api.usersList({
        headers: basicHeaders(),
      });
      setUsers(response.data);
    } catch (error) {
      exception(error);
    }
  };

  const checkReportStatus = conv => {
    if (conv) {
      const lastMessageInConversation = conv.messages
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .at(-1);

      return !lastMessageInConversation.status;
    }
    return false;
  };

  const resetCurrentReport = () => {
    resetReportCoordinates();
    formik.resetForm();
  };

  const createStopConversation = async text => {
    setLoading(true);
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
    setLoading(true);
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
    setLoading(true);
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

  return (
    <div className="report">
      {loading && (
        <div className="report__loader">
          <CircularProgress />
        </div>
      )}
      <div className="report__info">
        <div className="report__heading">
          <span className="report__heading-type">{activeStop ? 'Stop' : lat || lon ? 'Report' : ''}</span>
          <br />
          {activeStop && (
            <b className="report__heading-name">
              {activeStop.name} {activeStop.number}
            </b>
          )}
          <br />
          <br />
        </div>

        <div className="report__status">
          <p>Report state: {isReportActive ? 'Active' : 'Inactive'}</p>
        </div>

        <h6 className="report__title">Conversation</h6>
        <div className="report__conversation">
          {conversation ? (
            conversation.messages
              .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              .map(message => <ConversationMessage key={message.id} data={message} users={users} />)
          ) : (
            <p>No reports</p>
          )}
        </div>
      </div>
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
                control={<Checkbox disabled={!isReportActive} id="approveReport" />}
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

export default NewReport;
