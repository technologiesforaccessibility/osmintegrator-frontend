import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import colors from '../../stylesheets/config/colors.module.scss';

const Logout = () => {
  const {t} = useTranslation();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    setTimeout(() => proceedLogOut(), 5000);
  }, []);

  const proceedLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenRefresh');
    setShouldRedirect(true);
  };

  return (
    <>
      {shouldRedirect && <Redirect to="/auth/login" />}
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
    </>
  );
};

export default Logout;
