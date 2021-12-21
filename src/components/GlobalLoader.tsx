import {FC, useContext} from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import {UserContext} from './contexts/UserContextProvider';
import '../stylesheets/loader.scss';

const GlobalLoader: FC = () => {
  const {loader: isLoading} = useContext(UserContext);
  return (
    <>
      {isLoading && (
        <div className="loader-area">
          <CircularProgress size={100} />
        </div>
      )}
    </>
  );
};

export default GlobalLoader;
