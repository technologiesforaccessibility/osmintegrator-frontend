import React, {useEffect, useContext} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import AuthLayout from '../AuthLayout';
import {logout} from '../../redux/actions/authActions';
import {selectAuthIsLoggedIn} from '../../redux/selectors/authSelector';
import {paths} from '../../utilities/constants';
import {MapContext} from './../contexts/MapContextProvider';

import colors from '../../stylesheets/config/colors.module.scss';

const Logout = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const {resetMapContext} = useContext(MapContext);

  useEffect(() => {
    setTimeout(() => proceedLogOut(), 5000);
    resetMapContext();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const proceedLogOut = () => {
    dispatch(logout());
  };

  return (
    <AuthLayout>
      {!isLoggedIn && <Redirect to={paths.LOGIN} />}
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
    </AuthLayout>
  );
};

export default Logout;
