import React from 'react';
import {useTranslation} from 'react-i18next';

import '../stylesheets/footerContact.scss';

const {REACT_APP_CONTACT_FORM} = process.env;

const FooterContact = () => {
  const {t} = useTranslation();

  return (
    <div className="footer__container">
      {t('contactForm.description')}
      <a target="_blank" rel="noopener noreferrer" href={REACT_APP_CONTACT_FORM}>{t('contactForm.message')}</a>
    </div>
  );
};

export default FooterContact;
