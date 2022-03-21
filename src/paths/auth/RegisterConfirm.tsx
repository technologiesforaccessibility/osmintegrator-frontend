import 'stylesheets/confirm.scss';

import Button from '@mui/material/Button';
import { ReactComponent as Logo } from 'assets/accountLogo.svg';
import AuthContainer from 'components/AuthContainer';
import { useTranslation } from 'react-i18next';
import { paths } from 'utilities/constants';

const RegisterConfirm = () => {
  const { t } = useTranslation();

  return (
    <AuthContainer>
      <Logo />
      <p className="confirm__header">{t('register.confirm.header')}</p>
      <p className="confirm__paragraph">{t('register.confirm.paragraph')}</p>
      <p className="confirm__side-note">{t('register.confirm.sideNote')}</p>
      <Button variant="contained" href={paths.LOGIN}>
        {t('register.loginPage')}
      </Button>
    </AuthContainer>
  );
};

export default RegisterConfirm;
