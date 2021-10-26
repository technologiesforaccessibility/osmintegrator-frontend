import React from 'react';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {Chip, TextField} from '@mui/material';
const ConversationMessage = ({data, users}) => {
  const getMessageDate = () => {
    const currentDate = new Date(data.createdAt);
    return `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
  };

  const getUser = () => {
    const currentUser = users.filter(user => user.id === data.userId);
    if (currentUser) {
      return currentUser[0]?.userName;
    }
    return 'no user';
  };

  const getIcon = () =>
    data.status === 0 ? (
      <Chip
        sx={{border: 'none'}}
        variant="outlined"
        icon={<ChatBubbleIcon />}
        label={getMessageDate() + ' ' + getUser()}
        color="primary"
      />
    ) : (
      <CheckCircleIcon color="success" />
    );
  return (
    <>
      <div className="message">
        <div className="message__top">
          {data.status === 0 ? <ChatBubbleIcon color="primary" /> : <CheckCircleIcon color="success" />}
          <div className="message__date">{getMessageDate()}</div>
          <div className="message__user">{getUser()}</div>
        </div>
        <p className="message__content">{data.text}</p>

        <TextField disabled id="outlined-disabled" label={getIcon()} defaultValue="Hello World" />
      </div>
    </>
  );
};

export default ConversationMessage;
