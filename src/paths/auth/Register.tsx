import '../../stylesheets/register.scss';

import AccountCircle from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { Formik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';

import api from '../../api/apiInstance';
import AuthBottomPanel from '../../components/auth/AuthBottomPanel';
import AuthContainer from '../../components/AuthContainer';
import Loader from '../../components/Loader';
import { basicHeaders } from '../../config/apiConfig';
import { paths } from '../../utilities/constants';
import { exception } from '../../utilities/exceptionHelper';
import { RegisterSchema } from '../../utilities/validationSchema';

const { REACT_APP_REGULATIONS } = process.env;

const Register = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [registered, setRegistered] = useState(false);

  const register = async (username: string, email: string, password1: string) => {
    try {
      await api.accountRegisterCreate({ email, username, password: password1 }, { headers: basicHeaders() });
      setRegistered(true);
    } catch (error) {
      exception(error);
    }

    setIsLoading(false);
  };

  if (registered) {
    return <Redirect to={paths.REGISTER_CONFIRM} />;
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <AuthContainer>
        <div className="register__logo">
          <h1 className="register__title" color="primary">
            {t('register.title')}
          </h1>
        </div>
        <div className="register__content">
          <Formik
            onSubmit={({ username, email, password1 }) => {
              setIsLoading(true);
              register(username, email, password1);
            }}
            initialValues={{
              username: '',
              email: '',
              password1: '',
              password2: '',
            }}
            validationSchema={RegisterSchema}>
            {({ handleChange, values, handleSubmit, errors, touched }) => (
              <form className="content-container" onSubmit={handleSubmit} noValidate>
                <div className="content-container__text-field">
                  <TextField
                    type="text"
                    id="username"
                    label={t('register.usernamePlaceholder')}
                    onChange={handleChange('username')}
                    value={values.username}
                    disabled={isLoading}
                    error={touched.username && !!errors.username}
                    variant={'standard'}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Tooltip title={t('register.usernamePrompt') as string}>
                            <AccountCircle />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    helperText={touched.username && errors.username}
                  />
                </div>
                <div className="content-container__text-field">
                  <TextField
                    type="email"
                    id="email"
                    label="E-mail"
                    onChange={handleChange('email')}
                    value={values.email}
                    disabled={isLoading}
                    error={touched.email && !!errors.email}
                    variant={'standard'}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AlternateEmailIcon />
                        </InputAdornment>
                      ),
                    }}
                    helperText={touched.email && errors.email}
                  />
                </div>
                <div className="content-container__text-field">
                  <TextField
                    type="password"
                    id="password1"
                    label={t('register.passwordPlaceholder')}
                    onChange={handleChange('password1')}
                    value={values.password1}
                    disabled={isLoading}
                    error={touched.password1 && !!errors.password1}
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
                    helperText={touched.password1 && errors.password1}
                  />
                </div>
                <div className="content-container__text-field">
                  <TextField
                    type="password"
                    id="password2"
                    label={t('register.passwordConfirmationPlaceholder')}
                    onChange={handleChange('password2')}
                    value={values.password2}
                    disabled={isLoading}
                    error={touched.password2 && !!errors.password2}
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
                    helperText={touched.password2 && errors.password2}
                  />
                </div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      color="primary"
                      onChange={handleChange}
                      id="terms-checkbox"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                      onClick={() => {
                        setChecked(!checked);
                      }}
                      tabIndex={0}
                    />
                  }
                  label={
                    <p className="register__regulations">
                      {t('register.agreementText')}
                      <a
                        target="_blank"
                        className="agreement-link"
                        rel="noopener noreferrer"
                        href={REACT_APP_REGULATIONS}>
                        {t('register.agreementThisLink')}.
                      </a>
                    </p>
                  }
                />

                <Button variant="contained" disabled={!checked || isLoading} type="submit" className="register__button">
                  {t('register.button')}
                </Button>
              </form>
            )}
          </Formik>
        </div>

        <div className="register__bottom">
          <AuthBottomPanel linkText={t('register.login')} link={paths.LOGIN} />
        </div>
      </AuthContainer>
    </>
  );
};

export default Register;
