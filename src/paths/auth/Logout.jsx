import {useEffect, useContext} from 'react';

import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';

import AuthContainer from '../../components/AuthContainer';
import {paths} from '../../utilities/constants';
import {MapContext} from '../../components/contexts/MapContextProvider';

import {CircularProgress} from '@mui/material';

const Logout = () => {
  const history = useHistory();
  const {t} = useTranslation();

  const {resetMapContext} = useContext(MapContext);

  useEffect(() => {
    setTimeout(() => proceedLogOut(), 2000);
    resetMapContext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const proceedLogOut = () => {
    history.push(paths.LOGIN);
  };

  return (
    <AuthContainer>
      <h5 className="auth-title">{t('logout.title')} </h5>
      <div className="auth-message">{t('logout.message')}</div>
      <CircularProgress color="success" />
    </AuthContainer>
  );
};

export default Logout;
