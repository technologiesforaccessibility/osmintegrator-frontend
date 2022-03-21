import CircularProgress from '@mui/material/CircularProgress';
import { FC } from 'react';

import '../stylesheets/loader.scss';

type TLoaderProps = {
  isLoading: boolean;
};

const Loader: FC<TLoaderProps> = ({ isLoading }) => {
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

export default Loader;
