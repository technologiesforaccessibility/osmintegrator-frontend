import './app.scss';
import './globalStyles.scss';

import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import store from 'redux/store';

import ConversationContextProvider from '../contexts/ConversationProvider';
import MapContextProvider from '../contexts/MapContextProvider';
import UserContextProvider from '../contexts/UserContextProvider';
import CookiesBar from '../CookiesBar';
import GlobalLoader from '../Loader/GlobalLoader';
import Navigation from '../Navigation';
import Notification from '../Notification';

const App = () => {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <Notification />
        <CookiesBar />
        <UserContextProvider>
          <MapContextProvider>
            <ConversationContextProvider>
              <GlobalLoader />
              <Navigation />
            </ConversationContextProvider>
          </MapContextProvider>
        </UserContextProvider>
      </CookiesProvider>
    </Provider>
  );
};

export default App;
