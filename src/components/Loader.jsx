import CircularProgress from '@mui/material/CircularProgress';

import '../stylesheets/loader.scss';

const Loader = ({isLoading}) => {
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
