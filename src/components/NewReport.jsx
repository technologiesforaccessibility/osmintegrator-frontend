import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ConversationContext } from './contexts/ConversationProvider';
import { MapContext } from './contexts/MapContextProvider';

import ConversationMessage from './ConversationMessage';
import { Button, CircularProgress, Modal } from '@mui/material';
import ConversationHeading from './ConversationHeading';
import ConversationForm from './ConversationForm';
import '../stylesheets/newReport.scss';
import { Box } from '@mui/material';
import { modalStyle } from '../stylesheets/sharedStyles';

const NewReport = () => {
  const [loading, setLoading] = useState(false);
  const [isReportActive, setReportActive] = useState(false);
  const [conversation, setConversation] = useState(null);
  const conversationWrapper = useRef(null);
  const { t } = useTranslation();
  const {
    newReportCoordinates,
    resetReportCoordinates,
    activeStop,
    setActiveStop,
    displayPropertyGrid,
    setNewReportCoordinates,
  } = useContext(MapContext);
  const { geoConversations, stopConversations, inputContent, setInputContent, openModal, setOpenModal } =
    useContext(ConversationContext);
  const { lat, lon } = newReportCoordinates;

  const checkReportStatus = conv => {
    if (conv) {
      return !conv.status;
    }
    return false;
  };

  async function getGeoConversation() {
    if (!lat && !lon) return;
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

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseReport = () => {
    if (!inputContent) {
      setActiveStop(null);
      setNewReportCoordinates({ lat: null, lon: null });
      displayPropertyGrid(null);
      resetReportCoordinates();
    } else {
      handleOpenModal();
    }
  };

  const handleLoader = value => {
    setLoading(value);
  };

  const handleCloseModal = () => {
    setInputContent('');
    setOpenModal(false);
    setActiveStop(null);
    resetReportCoordinates();
  };

  const scrollToEnd = () => {
    setTimeout(() => {
      if (conversationWrapper.current) {
        conversationWrapper.current.scrollTop = conversationWrapper.current.scrollHeight;
      }
    }, 100);
  };

  useEffect(() => {
    getStopConversation();
    scrollToEnd();
    if (loading) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStop, stopConversations]);

  useEffect(() => {
    getGeoConversation();
    scrollToEnd();
    if (loading) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newReportCoordinates, geoConversations]);

  useEffect(() => {
    async function firstRender() {
      await getStopConversation();
    }
    firstRender();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <div ref={conversationWrapper} className="report__conversation">
              {conversation ? (
                conversation.messages
                  .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                  .map(message => <ConversationMessage key={message.id} data={message} />)
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
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modalStyle} className="report__modal">
          <p>{t('report.modal')}</p>
          <div className="report__modal-buttons">
            <Button variant="outlined" onClick={() => setOpenModal(false)}>
              {t('no')}
            </Button>
            <Button variant="contained" onClick={() => handleCloseModal()}>
              {t('yes')}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default NewReport;
