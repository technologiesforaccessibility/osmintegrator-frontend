import CircularProgress from '@mui/material/CircularProgress';

import '../stylesheets/loader.scss';

const Loader = ({isLoading}) => {
  return (
    <>
      {isLoading && (
        <div className="loader-area">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default Loader;
