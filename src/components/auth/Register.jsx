import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import {NavLink} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import InputAdornment from '@material-ui/core/InputAdornment';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import AuthContainer from '../AuthContainer';
import {paths} from '../../utilities/constants';
import {RegisterSchema} from '../../utilities/validationSchema';
import {ReactComponent as Logo} from './../../assets/accountLogo.svg';
import api from '../../api/apiInstance';
import {basicHeaders} from '../../config/apiConfig';
import {NotificationActions} from '../../redux/actions/notificationActions';

import '../../stylesheets/register.scss';

const {REACT_APP_CONTACT_FORM} = process.env;

const Register = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const register = async (username, email, password1) => {
    try {
      await api.accountRegisterCreate({email, username, password: password1}, {headers: basicHeaders()});
      dispatch(NotificationActions.success(t('register.success')));
    } catch (error) {
      dispatch(
        NotificationActions.error(
          error.errors && error.errors.message & error.errors.message[0] ? error.errors.message[0] : t('register.fail'),
        ),
      );
    }

    setIsLoading(false);
  };

  return (
    <AuthContainer>
      <Logo />
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
          <>
            <TextField
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
            />
            <div className="register__spacer">{errors.username && touched.username && <p>{errors.username}</p>}</div>

            <TextField
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
            />
            <div className="register__spacer">{errors.email && touched.email && <p>{errors.email}</p>}</div>

            <TextField
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
            />
            <div className="register__spacer">{errors.password1 && touched.password1 && <p>{errors.password1}</p>}</div>

            <TextField
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
            />
            <div className="register__spacer">{errors.password2 && touched.password2 && <p>{errors.password2}</p>}</div>

            <Button variant="contained" disabled={isLoading} onClick={handleSubmit} className="register__button">
              {t('register.button')}
            </Button>
          </>
        )}
      </Formik>

      <div className="link register__utils">
        <NavLink to={paths.LOGIN}>{t('register.login')}</NavLink>
        <Tooltip title={t('register.reportPrompt')}>
          <a target="_blank" rel="noopener noreferrer" href={REACT_APP_CONTACT_FORM}>
            ?
          </a>
        </Tooltip>
      </div>
    </AuthContainer>
  );
};

export default Register;
