import React from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {unsafeFormApiError} from '../../utilities/utilities';
import FooterContact from '../FooterContact';
import AuthLayout from '../AuthLayout';
import {login} from '../../redux/actions/authActions';
import {selectAuthIsLoggedIn, selectAuthLoading, selectAuthError} from '../../redux/selectors/authSelector';
import {paths} from '../../utilities/constants';

import '../../stylesheets/login.scss';
import colors from '../../stylesheets/config/colors.module.scss';

const Login = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const formik = useFormik({
    initialValues: {
      loginEmail: '',
      loginPassword: '',
    },
    onSubmit: ({loginEmail, loginPassword}) => {
      runLogin(loginEmail, loginPassword);
    },
  });

  const runLogin = async (email, password) => {
    return dispatch(login({email, password}));
  };

  return !isLoading && isLoggedIn ? (
    <Redirect to={paths.HOME} />
  ) : (
    <AuthLayout>
      <h1 className="auth-title">{t('login.title')}</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="inputbox-spacer">
          <input
            type="text"
            id="loginEmail"
            placeholder="E-mail"
            onChange={formik.handleChange}
            value={formik.values.loginEmail}
            disabled={isLoading}
          />
        </div>
        <div className="inputbox-spacer">
          <input
            type="password"
            id="loginPassword"
            placeholder={t('login.password')}
            onChange={formik.handleChange}
            value={formik.values.loginPassword}
            disabled={isLoading}
          />
        </div>
        <div className="login-button-area">
          <button type="submit" id="button-login" disabled={isLoading}>
            {t('login.loginText')}
          </button>
        </div>
      </form>

      <div className="link">
        <NavLink to={paths.RECOVER_PASSWORD}>{t('login.forgotPassword')}</NavLink>
      </div>
      <div className="auth-info-placeholder centered">
        {error && <span style={{color: colors['colorMessageFail']}}>{unsafeFormApiError(error, t, 'login')}</span>}
      </div>
      <FooterContact />
    </AuthLayout>
  );
};

export default Login;
