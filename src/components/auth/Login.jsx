import React, {useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';

import {noTokenHeaders} from '../../config/apiConfig';
import {unsafeFormApiError} from '../../utilities/utilities';
import client from '../../api/apiInstance';

import '../../stylesheets/login.scss';
import colors from '../../stylesheets/config/colors.module.scss';

const Login = () => {
  const {t} = useTranslation();

  const [message, setMessage] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);

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
    try {
      const response = await client.api.accountLoginCreate(
        {
          email,
          password,
        },
        {headers: noTokenHeaders()},
      );
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('tokenRefresh', response.data.refreshToken);
      setShouldRedirect(true);
    } catch (error) {
      setMessage(unsafeFormApiError(error, t, 'login'));
    }
  };

  return shouldRedirect ? (
    <Redirect to="/" />
  ) : (
    <>
      <h1 className="auth-title">{t('login.title')}</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="inputbox-spacer">
          <input
            type="text"
            id="loginEmail"
            placeholder="E-mail"
            onChange={formik.handleChange}
            value={formik.values.loginEmail}
          />
        </div>
        <div className="inputbox-spacer">
          <input
            type="password"
            id="loginPassword"
            placeholder={t('login.password')}
            onChange={formik.handleChange}
            value={formik.values.loginPassword}
          />
        </div>
        <div className="login-button-area">
          <button type="submit" id="button-login">
            {t('login.loginText')}
          </button>
        </div>
      </form>

      <div className="link">
        <NavLink to="/auth/recover">{t('login.forgotPassword')}</NavLink>
      </div>
      <div className="auth-info-placeholder centered">
        {message && <span style={{color: colors['colorMessageFail']}}>{message}</span>}
      </div>
    </>
  );
};

export default Login;
