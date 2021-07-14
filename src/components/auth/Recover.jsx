import React, {useState} from 'react';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';

import {noTokenHeaders} from '../../config/apiConfig';
import client from '../../api/apiInstance';
import {unsafeFormApiError} from '../../utilities/utilities';
import FooterContact from '../FooterContact';

import '../../stylesheets/recover.scss';
import colors from '../../stylesheets/config/colors.module.scss';

const Recover = () => {
  const {t} = useTranslation();

  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState(null);

  const formik = useFormik({
    initialValues: {
      recoverEmail: '',
    },
    onSubmit: ({recoverEmail}) => {
      runRecover(recoverEmail);
    },
  });

  const runRecover = async email => {
    try {
      await client.api.accountForgotPasswordCreate(
        {
          email,
        },
        {headers: noTokenHeaders()},
      );
      setMessageColor(colors['colorMessageSuccess']);
      setMessage(t('recover.emailSent'));
    } catch (error) {
      setMessageColor(colors['colorMessageFail']);
      setMessage(unsafeFormApiError(error, t, 'recover'));
    }
  };

  return (
    <>
      <h1 className="auth-title">{t('recover.title')}</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="inputbox-spacer">
          <input
            type="text"
            id="recoverEmail"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.recoverEmail}
          />
        </div>
        <div className="recover-button-area">
          <button type="submit" id="button-reset">
            {t('recover.button')}
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

export default Recover;
