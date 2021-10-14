import {Redirect} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import TextField from '@mui/material/TextField';
import {Formik} from 'formik';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Tooltip from '@mui/material/Tooltip';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import {unsafeFormApiError} from '../../utilities/utilities';
import {ReactComponent as Logo} from './../../assets/accountLogo.svg';
import AuthContainer from '../AuthContainer';
import {LoginSchema} from '../../utilities/validationSchema';
import {login} from '../../redux/actions/authActions';
import {selectAuthIsLoggedIn, selectAuthLoading, selectAuthError} from '../../redux/selectors/authSelector';
import {paths} from '../../utilities/constants';

import '../../stylesheets/login.scss';
import colors from '../../stylesheets/config/colors.module.scss';
import AuthBottomPanel from './AuthBottomPanel';

const Login = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const runLogin = async (email, password) => {
    dispatch(login({email, password}));
  };

  return !isLoading && isLoggedIn ? (
    <Redirect to={paths.HOME} />
  ) : (
    <AuthContainer>
      <div className="register__logo">
        <Logo />
      </div>
      <Formik
        onSubmit={({email, password}) => {
          runLogin(email, password);
        }}
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}>
        {({handleChange, values, handleSubmit, errors, touched}) => (
          <form onSubmit={handleSubmit}>
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
              id="password"
              placeholder={t('register.passwordPlaceholder')}
              onChange={handleChange('password')}
              value={values.password}
              disabled={isLoading}
              error={errors.password && touched.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Tooltip title={t('register.passwordPrompt')}>
                      <VpnKeyIcon />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              helperText={errors.password && touched.password}
            />
            <Button
              variant="contained"
              disabled={isLoading}
              className="register__button"
              type="submit">
              {t('login.loginText')}
            </Button>
          </form>
        )}
      </Formik>

      <p className="login-link">
        {t('login.forgotPassword') + ' '}
        <a target="_blank" rel="noopener noreferrer" href={paths.RESET_PASSWORD}>
          {t('login.clickHere')}
        </a>
        !
      </p>

      <AuthBottomPanel linkText={t('login.register')} link={paths.REGISTER} />

      <div className="auth-info-placeholder centered">
        {error && <span style={{color: colors['colorMessageFail']}}>{unsafeFormApiError(error, t, 'login')}</span>}
      </div>
    </AuthContainer>
  );
};

export default Login;
