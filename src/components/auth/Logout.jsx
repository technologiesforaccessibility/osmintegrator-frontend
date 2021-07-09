import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import colors from '../../stylesheets/config/colors.module.scss';
import {logout} from '../../redux/actions/authActions';
import {selectAuthIsLoggedIn} from '../../redux/selectors/authSelector';

const Logout = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  useEffect(() => {
    setTimeout(() => proceedLogOut(), 5000);
  }, []);

  const proceedLogOut = () => {
    dispatch(logout());
  };

  return (
    <>
      {!isLoggedIn && <Redirect to="/auth/login" />}
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
