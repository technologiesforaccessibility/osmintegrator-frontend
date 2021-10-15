import {useTranslation} from 'react-i18next';
import Button from '@mui/material/Button';

import AuthContainer from '../AuthContainer';
import {ReactComponent as Logo} from './../../assets/accountLogo.svg';
import {paths} from '../../utilities/constants';

import '../../stylesheets/registerConfirm.scss';

const RegisterConfirm = () => {
  const {t} = useTranslation();

  return (
    <AuthContainer>
      <Logo />
      <p className="register-confirm__header">{t('register.confirm.header')}</p>
      <p className="register-confirm__paragraph">{t('register.confirm.paragraph')}</p>
      <p className="register-confirm__side-note">{t('register.confirm.sideNote')}</p>
      <Button variant="contained" href={paths.LOGIN}>
        {t('register.loginPage')}
      </Button>
    </AuthContainer>
  );
};

export default RegisterConfirm;
