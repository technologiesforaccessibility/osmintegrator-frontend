import {useState} from 'react';
import {useFormik} from 'formik';
import {Redirect} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Button, InputAdornment, TextField, Tooltip} from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import {
  comparePasswords,
  isPasswordStrong,
  getEmailFromPath,
  getTokenFromPath,
  unsafeFormApiError,
} from '../../utilities/utilities';

import {noTokenHeaders} from '../../config/apiConfig';
import api from '../../api/apiInstance';
import {paths} from '../../utilities/constants';
import AuthContainer from '../AuthContainer';

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
    <AuthContainer>
      {shouldRedirect && <Redirect to={paths.LOGIN} />}

      <h1 className="auth-title">{t('setPassword.title')}</h1>
      <h3 className="subtitle">{getEmailFromPath(window.location.href)}</h3>
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
                  <Tooltip title={t('register.passwordPrompt')}>
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
            id="password2"
            label={t('setPassword.repeatPassword')}
            onChange={formik.handleChange}
            value={formik.values.newPassword2}
            variant={'standard'}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Tooltip title={t('register.passwordPrompt')}>
                    <VpnKeyIcon />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Button variant="contained" type="submit" className="register__button">
          {t('setPassword.button')}
        </Button>
      </form>
      <div className="centered auth-info-placeholder">
        {message && <span style={{color: messageColor}}>{message}</span>}
      </div>
    </AuthContainer>
  );
};
export default SetPassword;
