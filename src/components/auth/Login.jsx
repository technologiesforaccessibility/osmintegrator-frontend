import {Link, Redirect} from 'react-router-dom';
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
import AuthContainer from '../AuthContainer';
import {LoginSchema} from '../../utilities/validationSchema';
import {login} from '../../redux/actions/authActions';
import {selectAuthIsLoggedIn, selectAuthLoading, selectAuthError} from '../../redux/selectors/authSelector';
import {paths} from '../../utilities/constants';

import '../../stylesheets/login.scss';
import colors from '../../stylesheets/config/colors.module.scss';
import AuthBottomPanel from './AuthBottomPanel';
import {Chip, Divider} from '@mui/material';

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
        <h1 className="register__title" color="primary">
          {t('login.loginText')}
        </h1>
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
          <form className="content-container" onSubmit={handleSubmit} noValidate>
            <div className="content-container__text-field">
              <TextField
                type="email"
                id="email"
                label="E-mail"
                onChange={handleChange('email')}
                value={values.email}
                disabled={isLoading}
                error={errors.email && touched.email}
                variant={'standard'}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailIcon />
                    </InputAdornment>
                  ),
                }}
                helperText={errors.email && touched.email && errors.email}
              />
            </div>
            <div className="content-container__text-field">
              <TextField
                type="password"
                id="password"
                label={t('register.passwordPlaceholder')}
                onChange={handleChange('password')}
                value={values.password}
                disabled={isLoading}
                error={errors.password && touched.password}
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
                helperText={errors.password && touched.password}
              />
            </div>
            <Button variant="contained" disabled={isLoading} className="register__button" type="submit">
              {t('login.loginText')}
            </Button>
          </form>
        )}
      </Formik>

      <p className="login-link">
        {t('login.forgotPassword') + ' '}
        <Link to={paths.RECOVER_PASSWORD}>{t('login.clickHere')}</Link>!
      </p>

      <Divider>
        <Chip label={t('or')} />
      </Divider>

      <AuthBottomPanel linkText={t('login.register')} link={paths.REGISTER} />

      {error && (
        <div className="auth-info-placeholder centered">
          <span style={{color: colors['colorMessageFail']}}>{unsafeFormApiError(error, t, 'login')}</span>
        </div>
      )}
    </AuthContainer>
  );
};

export default Login;
