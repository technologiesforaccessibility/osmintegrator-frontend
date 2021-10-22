import {useContext, useEffect, useState} from 'react';
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
import {ConversationContext} from './contexts/ConversationProvider';
import ConversationMessage from './ConversationMessage';

const NewReport = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {newReportCoordinates, resetReportCoordinates, activeTile, setRerenderReports, activeStop} =
    useContext(MapContext);

  const {geoConversations, stopConversations, setUsers, users, setReload} = useContext(ConversationContext);
  const [conversation, setConversation] = useState(null);
  const {lat, lon} = newReportCoordinates;

  useEffect(() => {
    if (activeStop) {
      resetReportCoordinates();
      const currentStopConversation = stopConversations.filter(conv => conv.stopId === activeStop.id)[0];
      setConversation(currentStopConversation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStop, stopConversations]);

  useEffect(() => {
    const currentGeoConversation = geoConversations.filter(conv => conv.lat === lat && conv.lon === lon)[0];
    console.log(currentGeoConversation);
    setConversation(currentGeoConversation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newReportCoordinates, geoConversations]);

  useEffect(() => {
    setConversation(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newReportCoordinates]);

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

  useEffect(() => {
    getUsers();
    return () => {
      resetCurrentReport();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetCurrentReport = () => {
    resetReportCoordinates();
    formik.resetForm();
  };

  const createStopConversation = async text => {
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
      resetReportCoordinates();
      setRerenderReports(true);
    } catch (error) {
      console.log('nope');
      exception(error);
    }
  };

  const updateConversation = async text => {
    try {
      const response = await api.conversationCreate(
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
    },
    onSubmit: ({reportText}) => {
      if (activeStop === null && (lat === null || lon === null)) {
        dispatch(NotificationActions.error(t('report.noPinFound')));
        return;
      }
      if (!reportText) {
        dispatch(NotificationActions.error(t('report.noTextFound')));
        return;
      }

      if (conversation) {
        updateConversation(reportText);
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
  // const updateGeoConversation = async text => {
  //   try {
  //     const response = await api.conversationCreate(
  //       {conversationId: conversation.id, text, tileId: activeTile.id},
  //       {
  //         headers: basicHeaders(),
  //       },
  //     );

  //     dispatch(NotificationActions.success(t('report.success')));
  //     formik.resetForm();
  //     setReload(response.data);
  //   } catch (error) {
  //     exception(error);
  //   }
  // };

  // const sendReport = async text => {
  //   if (lat === null || lon === null) {
  //     dispatch(NotificationActions.error(t('report.noPinFound')));
  //     return;
  //   }
  //   if (!text) {
  //     dispatch(NotificationActions.error(t('report.noTextFound')));
  //     return;
  //   }
  //   try {
  //     await api.notesCreate(
  //       {lat, lon, text, tileId: activeTile.id},
  //       {
  //         headers: basicHeaders(),
  //       },
  //     );
  //     dispatch(NotificationActions.success(t('report.success')));
  //     resetReportCoordinates();
  //     setRerenderReports(true);
  //     formik.resetForm();
  //   } catch (error) {
  //     exception(error);
  //   }
  // };

  return (
    <>
      <div className="report__info">
        <div className="report__heading">
          <span className="report__heading-type">Stop</span>
          {activeStop && (
            <span className="report__heading-name">
              {activeStop.name} {activeStop.number}
            </span>
          )}
        </div>
        {/* <div className="report__status">{conversation && <span>{conversation.message[0].status}</span>}</div> */}

        <h4 className="report__title">Conversation</h4>
        {conversation ? (
          conversation.messages.map(message => <ConversationMessage key={message.id} data={message} users={users} />)
        ) : (
          <p>No reports</p>
        )}
      </div>
      <form onSubmit={formik.handleSubmit} className="report__add-message">
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

          {/* <Button style={buttonStyle} type="submit" onClickHandler={() => {}}>
            {t('report.button')}
          </Button> */}
        </div>
      </form>
    </>
  );
};

export default NewReport;
