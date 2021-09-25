import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import {NavLink} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import InputAdornment from '@material-ui/core/InputAdornment';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import {webError} from '../../utilities/messagesHelper';
import AuthContainer from '../AuthContainer';
import {paths} from '../../utilities/constants';
import {RegisterSchema} from '../../utilities/validationSchema';
import {ReactComponent as Logo} from './../../assets/accountLogo.svg';
import api from '../../api/apiInstance';
import {basicHeaders} from '../../config/apiConfig';
import {NotificationActions} from '../../redux/actions/notificationActions';

import '../../stylesheets/register.scss';
import {FormControlLabel} from '@material-ui/core';

const {REACT_APP_CONTACT_FORM, REACT_APP_REGULATIONS} = process.env;

const Register = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const register = async (username, email, password1) => {
    try {
      await api.accountRegisterCreate({email, username, password: password1}, {headers: basicHeaders()});
      dispatch(NotificationActions.success(t('register.success')));
    } catch (error) {
      error instanceof Response ? webError(error) : dispatch(NotificationActions.error(t('register.fail')));
    }

    setIsLoading(false);
  };

  return (
    <AuthContainer>
      <div>
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
              <div className="content-container">
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
                <div>
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
                      />
                    }
                    label={
                      <p className="register__regulations">
                        {t('register.agreementText')}
                        <a target="_blank" rel="noopener noreferrer" href={REACT_APP_REGULATIONS}>
                          {t('register.agreementThis')}
                        </a>
                        {t('register.agreementLink')}
                      </p>
                    }
                  />
                </div>

                <div>
                  <Button
                    variant="contained"
                    disabled={!checked || isLoading}
                    onClick={handleSubmit}
                    className="register__button">
                    {t('register.button')}
                  </Button>
                </div>
              </div>
            )}
          </Formik>
        </div>
        <div className="register__bottom link register__utils">
          <NavLink to={paths.LOGIN}>{t('register.login')}</NavLink>
          <Tooltip title={t('register.reportPrompt')}>
            <a target="_blank" rel="noopener noreferrer" href={REACT_APP_CONTACT_FORM}>
              ?
            </a>
          </Tooltip>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Register;
