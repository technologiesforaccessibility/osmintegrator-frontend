import {useState} from 'react';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';

import {noTokenHeaders} from '../../config/apiConfig';
import api from '../../api/apiInstance';
import {unsafeFormApiError} from '../../utilities/utilities';
import AuthContainer from '../AuthContainer';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

import colors from '../../stylesheets/config/colors.module.scss';
import {Button, Chip, Divider, InputAdornment, TextField, Tooltip} from '@mui/material';
import AuthBottomPanel from './AuthBottomPanel';
import {paths} from '../../utilities/constants';

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
      await api.accountForgotPasswordCreate(
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
    <AuthContainer>
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
                  <Tooltip title={t('register.passwordPrompt')}>
                    <AlternateEmailIcon />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Button sx={{marginTop: '20px'}} variant="contained" type="submit">
          {t('recover.button')}
        </Button>
      </form>
      <Divider sx={{marginTop: '20px'}}>
        <Chip label={t('or')} />
      </Divider>

      <AuthBottomPanel linkText={t('register.login')} link={paths.LOGIN} />
      <div className="centered auth-info-placeholder">
        {message && <span style={{color: messageColor}}>{message}</span>}
      </div>
    </AuthContainer>
  );
};

export default Recover;
