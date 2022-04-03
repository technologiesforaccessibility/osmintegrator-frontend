import { CircularProgress } from '@mui/material';
import AuthContainer from 'components/auth/AuthContainer/AuthContainer';
import { MapContext } from 'components/contexts/MapContextProvider';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { paths } from 'utilities/constants';

const Logout = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const { resetMapContext } = useContext(MapContext);

  const proceedLogOut = () => {
    history.push(paths.LOGIN);
  };

  useEffect(() => {
    setTimeout(() => proceedLogOut(), 2000);
    resetMapContext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContainer>
      <h5 className="auth-title">{t('logout.title')} </h5>
      <div className="auth-message">{t('logout.message')}</div>
      <CircularProgress color="success" />
    </AuthContainer>
  );
};

export default Logout;
