import './conversationForm.scss';

import { Button, Checkbox, FormControlLabel, TextareaAutosize } from '@mui/material';
import { Conversation } from 'api/apiClient';
import api from 'api/apiInstance';
import { basicHeaders } from 'config/apiConfig';
import { useFormik } from 'formik';
import useDebounce from 'hooks/useDebounce';
import { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { NotificationActions } from 'redux/actions/notificationActions';
import { exception } from 'utilities/exceptionHelper';

import { ConversationContext } from '../../contexts/ConversationProvider';
import { MapContext } from '../../contexts/MapContextProvider';

type TConversationFormProps = {
  lat: number;
  lon: number;
  isReportActive: boolean;
  conversation: Conversation;
  handleLoader: (value: boolean) => void;
};

const ConversationForm: FC<TConversationFormProps> = ({ lat, lon, isReportActive, conversation, handleLoader }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [currentInputValue, setCurrentInputValue] = useState('');
  const { activeTile, setRerenderReports, activeStop, displayPropertyGrid } = useContext(MapContext);
  const { setInputContent } = useContext(ConversationContext);
  const debouncedValue = useDebounce(currentInputValue, 500);

  useEffect(() => {
    setInputContent(debouncedValue);
  }, [debouncedValue, setInputContent]);

  const formik = useFormik({
    initialValues: {
      reportText: '',
      approveReport: false,
    },

    onSubmit: ({ reportText, approveReport }) => {
      setCurrentInputValue('');

      if (activeStop === null && (lat === null || lon === null)) {
        dispatch(NotificationActions.error(t('report.noPinFound')));
        return;
      }

      if (!reportText) {
        dispatch(NotificationActions.error(t('report.noTextFound')));
        return;
      }

      if (conversation) {
        if (approveReport) {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          approveConversation(reportText);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          updateConversation(reportText);
        }
        return;
      }

      if (activeStop !== null) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        createStopConversation(reportText);
        return;
      }

      if (lat !== null && lon !== null) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        createGeoConversation(reportText);
        return;
      }
    },
  });

  const createStopConversation = async (text: string) => {
    handleLoader(true);
    try {
      await api.conversationCreate(
        { text, stopId: activeStop?.id, tileId: activeTile?.id ?? '' },
        {
          headers: basicHeaders(),
        },
      );
      dispatch(NotificationActions.success(t('report.success')));
      formik.resetForm();
      setRerenderReports(true);
    } catch (error) {
      exception(error);
    }
  };

  const createGeoConversation = async (text: string) => {
    handleLoader(true);
    try {
      await api.conversationCreate(
        { text, lat, lon, tileId: activeTile?.id ?? '' },
        {
          headers: basicHeaders(),
        },
      );
      dispatch(NotificationActions.success(t('report.success')));
      formik.resetForm();
      // HACK: If user after creating new raport will switch to view mode, it will show Property grid without conversation id
      displayPropertyGrid({ lat, lon, tileId: activeTile?.id ?? '' });
      setRerenderReports(true);
    } catch (error) {
      exception(error);
    }
  };

  const updateConversation = async (text: string) => {
    handleLoader(true);
    try {
      await api.conversationCreate(
        { conversationId: conversation.id, text, tileId: activeTile?.id ?? '' },
        {
          headers: basicHeaders(),
        },
      );
      dispatch(NotificationActions.success(t('report.success')));
      formik.resetForm();
      setRerenderReports(true);
    } catch (error) {
      exception(error);
    }
  };

  const approveConversation = async (text: string) => {
    handleLoader(true);
    try {
      await api.conversationApproveUpdate(
        { conversationId: conversation.id, text, tileId: activeTile?.id ?? '' },
        {
          headers: basicHeaders(),
        },
      );
      dispatch(NotificationActions.success(t('report.success')));
      formik.resetForm();
      setRerenderReports(true);
    } catch (error) {
      exception(error);
    }
  };

  return (
    <div className="conversation-form">
      <form onSubmit={formik.handleSubmit} onChange={formik.handleChange} noValidate className="report__add-message">
        <TextareaAutosize
          minRows={4}
          placeholder={t('report.placeholder')}
          className="conversation-form__textarea"
          id="reportText"
          onChange={e => {
            formik.handleChange(e);
            setCurrentInputValue(e.target.value);
          }}
          value={formik.values.reportText}
        />

        <div className="conversation-form__bottom">
          <FormControlLabel
            control={<Checkbox checked={formik.values.approveReport} disabled={!isReportActive} id="approveReport" />}
            label={t('report.approve')}
            onChange={formik.handleChange}
          />

          <Button variant="outlined" type="submit" sx={{ marginLeft: 'auto' }}>
            {t('report.button')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ConversationForm;
