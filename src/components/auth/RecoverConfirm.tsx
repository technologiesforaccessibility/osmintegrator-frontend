import {useTranslation} from 'react-i18next';
import Button from '@mui/material/Button';

import AuthContainer from '../AuthContainer';
import {ReactComponent as Logo} from './../../assets/accountLogo.svg';
import {paths} from '../../utilities/constants';

import '../../stylesheets/confirm.scss';
import {Link} from 'react-router-dom';

const RecoverConfirm = () => {
  const {t} = useTranslation();

  return (
    <AuthContainer>
      <Logo />
      <p className="confirm__header"> {t('recover.confirm.header')}</p>
      <p className="confirm__paragraph">{t('recover.confirm.paragraph')}</p>
      <Button component={Link} variant="contained" to={paths.LOGIN}>
        {t('register.loginPage')}
      </Button>
    </AuthContainer>
  );
};

export default RecoverConfirm;
