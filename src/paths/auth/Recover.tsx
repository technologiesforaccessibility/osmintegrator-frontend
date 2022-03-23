import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Button, Chip, CircularProgress, Divider, InputAdornment, TextField, Tooltip } from '@mui/material';
import api from 'api/apiInstance';
import AuthBottomPanel from 'components/auth/AuthBottomPanel/AuthBottomPanel';
import AuthContainer from 'components/auth/AuthContainer/AuthContainer';
import { noTokenHeaders } from 'config/apiConfig';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import colors from 'stylesheets/config/colors.module.scss';
import { paths } from 'utilities/constants';
import { unsafeFormApiError } from 'utilities/utilities';

const Recover = () => {
  const { t } = useTranslation();

  const [message, setMessage] = useState<string>();
  const [messageColor, setMessageColor] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const runRecover = async (email: string) => {
    try {
      await api.accountForgotPasswordCreate(
        {
          email,
        },
        { headers: noTokenHeaders() },
      );
      setMessageColor(colors.colorMessageSuccess);
      setMessage(t('recover.emailSent'));
      setIsSend(true);
      setShouldRedirect(true);
    } catch (error) {
      setMessageColor(colors.colorMessageFail);
      setMessage(unsafeFormApiError(error, t, 'recover'));
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      recoverEmail: '',
    },
    onSubmit: ({ recoverEmail }) => {
      setLoading(true);
      runRecover(recoverEmail);
    },
  });

  return (
    <AuthContainer>
      {shouldRedirect && <Redirect to={paths.RECOVER_CONFIRM} />}

      <div className="register__logo">
        <h1 className="register__title" color="primary">
          {t('recover.title')}
        </h1>
      </div>

      <form className="content-container" onSubmit={formik.handleSubmit}>
        <div className="content-container__text-field">
          <TextField
            type="email"
            id="recoverEmail"
            label="E-mail"
            placeholder="E-mail"
            onChange={formik.handleChange}
            value={formik.values.recoverEmail}
            variant={'standard'}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Tooltip title={t('register.passwordPrompt') as string}>
                    <AlternateEmailIcon />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Button sx={{ marginTop: '20px' }} variant="contained" type="submit" fullWidth disabled={isSend}>
          {loading ? (
            <CircularProgress size={23} color="info" />
          ) : isSend ? (
            t('recover.buttonSent')
          ) : (
            t('recover.button')
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

export default Recover;
