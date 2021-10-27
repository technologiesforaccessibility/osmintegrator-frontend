import React, {useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ConversationContext} from './contexts/ConversationProvider';
import api from '../api/apiInstance';
import {basicHeaders} from '../config/apiConfig';
import {MapContext} from './contexts/MapContextProvider';
import {exception} from '../utilities/exceptionHelper';

import ConversationMessage from './ConversationMessage';
import {Button, CircularProgress, Modal} from '@mui/material';
import ConversationHeading from './ConversationHeading';
import ConversationForm from './ConversationForm';
import '../stylesheets/newReport.scss';
import {Box} from '@mui/system';
import {modalStyle} from './MapPanel';

const NewReport = () => {
  const [loading, setLoading] = useState(false);
  const [isReportActive, setReportActive] = useState(false);
  const [conversation, setConversation] = useState(null);

  const {t} = useTranslation();
  const {newReportCoordinates, resetReportCoordinates, activeStop, setActiveStop} = useContext(MapContext);
  const {geoConversations, stopConversations, setUsers, users, inputContent, openModal, setOpenModal} =
    useContext(ConversationContext);
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

  const getUsers = async () => {
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

  const handleCloseReport = () => {
    if (!inputContent) {
      setActiveStop(null);
      resetReportCoordinates();
    } else {
      handleOpenModal();
    }
  };

  const handleLoader = value => {
    setLoading(value);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className="report">
      {activeStop || (lat && lon) ? (
        <div className="report__wrapper">
          {loading && (
            <div className="report__loader">
              <CircularProgress />
            </div>
          )}

          <ConversationHeading
            lat={lat}
            lon={lon}
            activeStop={activeStop}
            isReportActive={isReportActive}
            handleCloseReport={handleCloseReport}
          />

          <div className="report__content bordered-wrapper">
            <div className="report__conversation">
              {conversation ? (
                conversation.messages
                  .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                  .map(message => <ConversationMessage key={message.id} data={message} users={users} />)
              ) : (
                <p>{t('report.noReportFound')}</p>
              )}
            </div>
            <div className="report__form">
              <ConversationForm
                lat={lat}
                lon={lon}
                isReportActive={isReportActive}
                conversation={conversation}
                handleLoader={handleLoader}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>{t('report.introInfo')}</div>
      )}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modalStyle} className="report__modal">
          <p>{t('report.modal')}</p>
          <div className="report__modal-buttons">
            <Button variant="outlined" onClick={handleCloseModal}>
              {t('no')}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setActiveStop(null);
                resetReportCoordinates();
                handleCloseModal();
              }}>
              {t('yes')}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default NewReport;
