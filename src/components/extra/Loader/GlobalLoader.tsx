import './loader.scss';

import CircularProgress from '@mui/material/CircularProgress';
import { FC, useContext } from 'react';

import { UserContext } from '../../contexts/UserContextProvider';

const GlobalLoader: FC = () => {
  const { loader: isLoading } = useContext(UserContext);
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
