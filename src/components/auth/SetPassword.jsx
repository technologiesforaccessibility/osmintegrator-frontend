import React, {useState} from 'react';
import {useFormik} from 'formik';
import {Redirect} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import {
  comparePasswords,
  isPasswordStrong,
  getEmailFromPath,
  getTokenFromPath,
  unsafeFormApiError,
} from '../../utilities/utilities';
import FooterContact from "../FooterContact";

import {noTokenHeaders} from '../../config/apiConfig';
import client from '../../api/apiInstance';

import '../../stylesheets/setPassword.scss';
import colors from '../../stylesheets/config/colors.module.scss';

const SetPassword = () => {
  const {t} = useTranslation();

  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const formik = useFormik({
    initialValues: {
      newPassword1: '',
      newPassword2: '',
    },
    onSubmit: ({newPassword1, newPassword2}) => {
      runUpdatePassword(newPassword1, newPassword2);
    },
  });

  const runUpdatePassword = async (password1, password2) => {
    if (comparePasswords(password1, password2) && isPasswordStrong(password1)) {
      try {
        await client.api.accountResetPasswordCreate(
          {
            email: getEmailFromPath(window.location.href),
            password: password1,
            token: getTokenFromPath(window.location.href),
          },
          {
            headers: noTokenHeaders(),
          },
        );
        setMessageColor(colors.colorMessageSuccess);
        setMessage(t('setPassword.changedPassword'));
        setTimeout(() => setShouldRedirect(true), 5000);
      } catch (error) {
        setMessageColor(colors['colorMessageFail']);
        setMessage(unsafeFormApiError(error, t, 'setPassword'));
      }
    } else {
      setMessageColor(colors['colorMessageFail']);
      setMessage(t('setPassword.invalidPasswords'));
    }
  };

  return (
    <>
      {shouldRedirect && <Redirect to="/auth/login" />}

      <h1 className="auth-title">{t('setPassword.title')}</h1>
      <h3 className="subtitle">{getEmailFromPath(window.location.href)}</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="inputbox-spacer">
          <input
            type="password"
            id="newPassword1"
            placeholder={t('setPassword.password')}
            onChange={formik.handleChange}
            value={formik.values.newPassword1}
          />
        </div>
        <div className="inputbox-spacer">
          <input
            type="password"
            id="newPassword2"
            placeholder={t('setPassword.repeatPassword')}
            onChange={formik.handleChange}
            value={formik.values.newPassword2}
          />
        </div>
        <div className="setPassword-button-area">
          <button type="submit" id="button-set-password">
            {t('setPassword.button')}
          </button>
        </div>
      </form>
      <div className="centered auth-info-placeholder">
        {message && <span style={{color: messageColor}}>{message}</span>}
      </div>
      <FooterContact />
    </>
  );
};
export default SetPassword;
