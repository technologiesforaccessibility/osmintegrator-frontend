import {Provider} from 'react-redux';
import store from '../redux/store';
import {CookiesProvider} from 'react-cookie';

import MapContextProvider from './contexts/MapContextProvider';
import UserContextProvider from './contexts/UserContextProvider';
import ConversationContextProvider from './contexts/ConversationProvider';
import Notification from './Notification';
import CookiesBar from './CookiesBar';
import Navigation from './Navigation';

import '../stylesheets/app.scss';
import '../stylesheets/globalStyles.scss';

const App = () => {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <Notification />
        <CookiesBar />
        <UserContextProvider>
          <MapContextProvider>
            <ConversationContextProvider>
              <Navigation />
            </ConversationContextProvider>
          </MapContextProvider>
        </UserContextProvider>
      </CookiesProvider>
    </Provider>
  );
};

export default App;
