import React, {createContext, useState} from 'react';

export const ConversationContext = createContext();

const ConversationContextProvider = ({children}) => {
  const [users, setUsers] = useState([]);
  const [geoConversations, setGeoConversations] = useState([]);
  const [stopConversations, setStopConversations] = useState([]);
  const [reload, setReload] = useState(null);
  const [inputContent, setInputContent] = useState('');
  const [openModal, setOpenModal] = useState(false);

  return (
    <ConversationContext.Provider
      value={{
        users,
        setUsers,
        stopConversations,
        geoConversations,
        setGeoConversations,
        setStopConversations,
        reload,
        setReload,
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
