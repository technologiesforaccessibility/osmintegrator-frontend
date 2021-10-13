import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import {Redirect} from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import InputAdornment from '@mui/material/InputAdornment';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {FormControlLabel} from '@mui/material';

import AuthContainer from '../AuthContainer';
import Loader from '../Loader';
import {paths} from '../../utilities/constants';
import {RegisterSchema} from '../../utilities/validationSchema';
import {ReactComponent as Logo} from './../../assets/accountLogo.svg';
import api from '../../api/apiInstance';
import {basicHeaders} from '../../config/apiConfig';
import AuthBottomPanel from './AuthBottomPanel';
import {exception} from '../../utilities/exceptionHelper';

import '../../stylesheets/register.scss';

const {REACT_APP_REGULATIONS} = process.env;

const Register = () => {
  const {t} = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [registered, setRegistered] = useState(false);

  const register = async (username, email, password1) => {
    try {
      await api.accountRegisterCreate({email, username, password: password1}, {headers: basicHeaders()});
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
          <Logo />
        </div>
        <div className="register__content">
          <Formik
            onSubmit={({username, email, password1}) => {
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
            {({handleChange, values, handleSubmit, errors, touched}) => (
              <form className="content-container" onSubmit={handleSubmit}>
                <TextField
                  className="content-container__text-field"
                  type="text"
                  id="username"
                  placeholder={t('register.usernamePlaceholder')}
                  onChange={handleChange('username')}
                  value={values.username}
                  disabled={isLoading}
                  error={errors.username && touched.username}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Tooltip title={t('register.usernamePrompt')}>
                          <AccountCircle />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  helperText={errors.username && touched.username && errors.username}
                />

                <TextField
                  className="content-container__text-field"
                  type="email"
                  id="email"
                  placeholder="E-mail"
                  onChange={handleChange('email')}
                  value={values.email}
                  disabled={isLoading}
                  error={errors.email && touched.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AlternateEmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  helperText={errors.email && touched.email && errors.email}
                />

                <TextField
                  className="content-container__text-field"
                  type="password"
                  id="password1"
                  placeholder={t('register.passwordPlaceholder')}
                  onChange={handleChange('password1')}
                  value={values.password1}
                  disabled={isLoading}
                  error={errors.password1 && touched.password1}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Tooltip title={t('register.passwordPrompt')}>
                          <VpnKeyIcon />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  helperText={errors.password1 && touched.password1 && errors.password1}
                />

                <TextField
                  className="content-container__text-field"
                  type="password"
                  id="password2"
                  placeholder={t('register.passwordConfirmationPlaceholder')}
                  onChange={handleChange('password2')}
                  value={values.password2}
                  disabled={isLoading}
                  error={errors.password2 && touched.password2}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Tooltip title={t('register.passwordPrompt')}>
                          <VpnKeyIcon />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  helperText={errors.password2 && touched.password2 && errors.password2}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      color="primary"
                      onChange={handleChange}
                      inputProps={{'aria-label': 'primary checkbox'}}
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

                <Button
                  variant="contained"
                  disabled={!checked || isLoading}
                  type="submit"
                  className="register__button">
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
