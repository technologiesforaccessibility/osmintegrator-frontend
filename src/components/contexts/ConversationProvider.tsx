import React, { createContext, FC, ReactNode, useState } from 'react';
import { Conversation } from '../../api/apiClient';

type TConversationContextValues = {
  stopConversations: Conversation[];
  geoConversations: Conversation[];
  setGeoConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  setStopConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  inputContent: string;
  setInputContent: React.Dispatch<React.SetStateAction<string>>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type TConversionContextProps = {
  children: ReactNode;
};

const defaultValue: TConversationContextValues = {
  stopConversations: [],
  geoConversations: [],
  setStopConversations: () => {},
  setGeoConversations: () => {},
  inputContent: '',
  setInputContent: () => {},
  openModal: false,
  setOpenModal: () => {},
};

export const ConversationContext = createContext<TConversationContextValues>(defaultValue);

const ConversationContextProvider: FC<TConversionContextProps> = ({ children }) => {
  const [geoConversations, setGeoConversations] = useState<Conversation[]>([]);
  const [stopConversations, setStopConversations] = useState<Conversation[]>([]);
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
