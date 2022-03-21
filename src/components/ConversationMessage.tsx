import '../stylesheets/conversationMessage.scss';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import dayjs from 'dayjs';
import React, { FC } from 'react';

import { Message } from '../api/apiClient';

type TConversationMessageProps = {
  data: Message;
};

const ConversationMessage: FC<TConversationMessageProps> = ({ data }) => {
  const getMessageDate = () => dayjs(data.createdAt).format('DD.MM.YYYY HH:mm');

  const getIcon = () =>
    data.status === 0 ? (
      <ErrorOutlineIcon color="primary" sx={{ transform: 'rotate(180deg)' }} />
    ) : (
      <CheckCircleOutlineIcon color="success" />
    );

  return (
    <div className="conversation-message">
      <fieldset>
        <legend>
          {getIcon()} {getMessageDate()} - {data.username}
        </legend>

        <p>{data.text}</p>
      </fieldset>
    </div>
  );
};

export default ConversationMessage;
