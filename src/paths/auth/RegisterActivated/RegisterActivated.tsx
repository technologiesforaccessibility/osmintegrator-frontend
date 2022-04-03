import './registerActivated.scss';

import Button from '@mui/material/Button';
import api from 'api/apiInstance';
import { ReactComponent as Logo } from 'assets/accountLogo.svg';
import AuthContainer from 'components/auth/AuthContainer/AuthContainer';
import Loader from 'components/extra/Loader/Loader';
import { noTokenHeaders } from 'config/apiConfig';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { paths } from 'utilities/constants';
import { getEmailFromPath, getTokenFromPath } from 'utilities/utilities';

const { REACT_APP_CONTACT_FORM } = process.env;

const RegisterConfirm = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [activatedSuccessfully, setActivatedSuccessfully] = useState(false);

  const activateAccount = async () => {
    try {
      const email = getEmailFromPath(window.location.href);
      const token = getTokenFromPath(window.location.href);
      await api.accountConfirmRegistrationCreate({ email, token }, { headers: noTokenHeaders() });
      setActivatedSuccessfully(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      activateAccount();
    }
  }, [isLoading]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <AuthContainer>
        <Logo />
        {isLoading ? (
          <p className="register-activated__header">{t('register.activated.headerLoading')}</p>
        ) : (
          <>
            {activatedSuccessfully ? (
              <>
                <p className="register-activated__header">{t('register.activated.header')}</p>
                <p className="register-activated__paragraph">{t('register.activated.paragraph')}</p>
              </>
            ) : (
              <>
                <p className="register-activated__header">{t('register.activated.headerProblem')}</p>
                <p className="register-activated__paragraph">
                  {t('register.activated.paragraphProblem.first')}
                  <a target="_blank" rel="noopener noreferrer" href={REACT_APP_CONTACT_FORM}>
                    {t('register.activated.paragraphProblem.second')}
                  </a>
                  {t('register.activated.paragraphProblem.third')}
                </p>
              </>
            )}
            <Button variant="contained" href={paths.LOGIN}>
              {t('register.loginPage')}
            </Button>
          </>
        )}
      </AuthContainer>
    </>
  );
};

export default RegisterConfirm;
