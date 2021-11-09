import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Redirect, Link} from 'react-router-dom';
import Button from '@mui/material/Button';

import AuthContainer from '../AuthContainer';
import {ReactComponent as Logo} from './../../assets/accountLogo.svg';
import {paths} from '../../utilities/constants';

import '../../stylesheets/confirm.scss';

const ResetConfirm = () => {
  const {t} = useTranslation();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  setTimeout(() => setShouldRedirect(true), 5000);
  return (
    <AuthContainer>
      {shouldRedirect && <Redirect to={paths.LOGIN} />}

      <Logo />
      <p className="confirm__header"> {t('setPassword.confirm.header')}</p>
      <p className="confirm__paragraph">{t('setPassword.confirm.paragraph')}</p>
      <Button component={Link} variant="contained" to={paths.LOGIN}>
        {t('register.loginPage')}
      </Button>
    </AuthContainer>
  );
};

export default ResetConfirm;
