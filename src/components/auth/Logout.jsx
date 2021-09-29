import {useEffect, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import { useHistory } from 'react-router-dom';

import AuthContainer from '../AuthContainer';
import {paths} from '../../utilities/constants';
import {MapContext} from './../contexts/MapContextProvider';

import colors from '../../stylesheets/config/colors.module.scss';

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
      <h1 className="auth-title">{t('logout.title')} </h1>
      <div className="auth-info-placeholder centered">
        <span
          style={{
            paddingTop: '10px',
            color: colors.colorMessageSuccess,
          }}>
          {' '}
          {t('logout.message')}
        </span>
      </div>
    </AuthContainer>
  );
};

export default Logout;
