import React from 'react';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
const ConversationMessage = ({data, users}) => {
  const getMessageDate = () => {
    const currentDate = new Date(data.createdAt);

    // const month = currentDate.get
    return `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
  };

  const getUser = () => {
    const currentUser = users.filter(user => user.id === data.userId);

    // console.log(currentUser);
    if (currentUser) {
      return currentUser[0]?.userName;
    }
    return 'no user';
  };

  return (
    <>
      <div className="message">
        <div className="message__top">
          <ChatBubbleIcon />
          <div className="message__date">{getMessageDate()}</div>
          <div className="message__user">{getUser()}</div>
        </div>
        <p className="message__content">{data.text}</p>
      </div>
    </>
  );
};

export default ConversationMessage;
