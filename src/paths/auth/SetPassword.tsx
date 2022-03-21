import '../../stylesheets/setPassword.scss';

import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Button, Chip, CircularProgress, Divider, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Redirect } from 'react-router-dom';

import api from '../../api/apiInstance';
import AuthBottomPanel from '../../components/auth/AuthBottomPanel';
import AuthContainer from '../../components/AuthContainer';
import { noTokenHeaders } from '../../config/apiConfig';
import colors from '../../stylesheets/config/colors.module.scss';
import { paths } from '../../utilities/constants';
import {
  comparePasswords,
  getEmailFromPath,
  getTokenFromPath,
  isPasswordStrong,
  unsafeFormApiError,
} from '../../utilities/utilities';

const SetPassword = () => {
  const { t } = useTranslation();

  const [message, setMessage] = useState<string>();
  const [messageColor, setMessageColor] = useState<string>();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isSend, setIsSend] = useState(false);

  const runUpdatePassword = async (password1: string, password2: string) => {
    if (comparePasswords(password1, password2) && isPasswordStrong(password1)) {
      try {
        await api.accountResetPasswordCreate(
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
        setShouldRedirect(true);
        setIsSend(true);
      } catch (error) {
        setMessageColor(colors.colorMessageFail);
        setMessage(unsafeFormApiError(error, t, 'setPassword'));
      }
      setLoading(false);
    } else {
      setMessageColor(colors.colorMessageFail);
      setMessage(t('setPassword.invalidPasswords'));
    }
  };

  const formik = useFormik({
    initialValues: {
      newPassword1: '',
      newPassword2: '',
    },
    onSubmit: ({ newPassword1, newPassword2 }) => {
      setLoading(true);
      runUpdatePassword(newPassword1, newPassword2);
    },
  });

  return (
    <AuthContainer>
      {shouldRedirect && <Redirect to={paths.CHANGE_PASSWORD_CONFIRM} />}

      <div className="register__logo">
        <h1 className="register__title" color="primary">
          Zmień hasło
        </h1>
      </div>

      {getEmailFromPath(window.location.href) ? (
        <div>
          <Typography gutterBottom>{t('setPassword.user')}</Typography>
          <Typography variant="subtitle2" gutterBottom>
            {getEmailFromPath(window.location.href)}
          </Typography>
        </div>
      ) : (
        <div>
          <Typography variant="subtitle1" gutterBottom>
            {t('setPassword.noParams.first')}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {t('setPassword.noParams.second')}
            <Link to={paths.RECOVER_PASSWORD}> {t('setPassword.noParams.third')}</Link>
          </Typography>
        </div>
      )}
      <form className="content-container" onSubmit={formik.handleSubmit}>
        <div className="content-container__text-field">
          <TextField
            type="password"
            id="newPassword1"
            label={t('setPassword.password')}
            onChange={formik.handleChange}
            value={formik.values.newPassword1}
            variant={'standard'}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Tooltip title={t('register.passwordPrompt') as string}>
                    <VpnKeyIcon />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="content-container__text-field">
          <TextField
            type="password"
            id="newPassword2"
            label={t('setPassword.repeatPassword')}
            onChange={formik.handleChange}
            value={formik.values.newPassword2}
            variant={'standard'}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Tooltip title={t('register.passwordPrompt') as string}>
                    <VpnKeyIcon />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Button
          sx={{ marginTop: '20px' }}
          variant="contained"
          type="submit"
          fullWidth
          disabled={isSend}
          className="register__button">
          {loading ? (
            <CircularProgress size={23} color="info" />
          ) : isSend ? (
            t('setPassword.buttonSent')
          ) : (
            t('setPassword.button')
          )}
        </Button>
      </form>

      <Divider sx={{ marginTop: '20px' }}>
        <Chip label={t('or')} />
      </Divider>

      <AuthBottomPanel linkText={t('register.login')} link={paths.LOGIN} />

      <div className="centered auth-info-placeholder">
        {message && <span style={{ color: messageColor }}>{message}</span>}
      </div>
    </AuthContainer>
  );
};
export default SetPassword;
