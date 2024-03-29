import './confirm.scss';

import Button from '@mui/material/Button';
import { ReactComponent as Logo } from 'assets/accountLogo.svg';
import AuthContainer from 'components/auth/AuthContainer/AuthContainer';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Redirect } from 'react-router-dom';
import { paths } from 'utilities/constants';

const ResetConfirm = () => {
  const { t } = useTranslation();
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
