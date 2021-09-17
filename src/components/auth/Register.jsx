import React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';

import FooterContact from '../FooterContact';
import {unsafeFormApiError} from '../../utilities/utilities';
import {NavLink, Redirect} from 'react-router-dom';
import AuthContainer from '../AuthContainer';
import { selectAuthError, selectAuthIsLoggedIn, selectAuthLoading } from '../../redux/selectors/authSelector';
import {paths} from '../../utilities/constants';

import { ReactComponent as Logo } from './../../assets/accountLogo.svg';

import '../../stylesheets/register.scss';
import colors from '../../stylesheets/config/colors.module.scss';

const Register = () => {
  const {t} = useTranslation();
//   const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);



//   const runLogin = async (email, password) => {
//     return dispatch(login({email, password}));
//   };

  return !isLoading && isLoggedIn ? (
    <Redirect to={paths.HOME} />
  ) : (
    <AuthContainer>
      <Logo/>
      <Formik initialValues={{name: 'jared'}} onSubmit={(values, actions) => {}}>
      {/* <div className="inputbox-spacer">
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
        </div> */}
      </Formik>
        

      <div className="link">
        <NavLink to={paths.RECOVER_PASSWORD}>{t('login.forgotPassword')}</NavLink>
      </div>
      <div className="auth-info-placeholder centered">
        {error && <span style={{color: colors['colorMessageFail']}}>{unsafeFormApiError(error, t, 'login')}</span>}
      </div>
      <FooterContact />
    </AuthContainer>
  );
};

export default Register;