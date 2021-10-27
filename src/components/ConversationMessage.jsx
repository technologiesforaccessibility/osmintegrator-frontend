import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import '../stylesheets/conversationMessage.scss';
import dayjs from 'dayjs';
const ConversationMessage = ({data, users}) => {
  const getMessageDate = () => dayjs(data.createdAt).format('DD.MM.YYYY H:m');

  const getUser = () => {
    const currentUser = users.filter(user => user.id === data.userId);
    if (currentUser) {
      return currentUser[0]?.userName;
    }
    return 'no user';
  };

  const getIcon = () =>
    data.status === 0 ? (
      <ErrorOutlineIcon color="primary" sx={{transform: 'rotate(180deg)'}} />
    ) : (
      <CheckCircleOutlineIcon color="success" />
    );
  return (
    <>
      <div className="conversation-message">
        <fieldset>
          <legend>
            {getIcon()} {getMessageDate()} - {getUser()}
          </legend>

          <p>{data.text}</p>
        </fieldset>
      </div>
    </>
  );
};

export default ConversationMessage;
