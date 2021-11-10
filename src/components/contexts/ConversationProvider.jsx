import React, {createContext, useState} from 'react';

export const ConversationContext = createContext();

const ConversationContextProvider = ({children}) => {
  const [geoConversations, setGeoConversations] = useState([]);
  const [stopConversations, setStopConversations] = useState([]);
  const [inputContent, setInputContent] = useState('');
  const [openModal, setOpenModal] = useState(false);

  return (
    <ConversationContext.Provider
      value={{
        stopConversations,
        geoConversations,
        setGeoConversations,
        setStopConversations,
        inputContent,
        setInputContent,
        openModal,
        setOpenModal,
      }}>
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationContextProvider;
