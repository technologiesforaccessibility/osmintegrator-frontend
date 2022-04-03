import './footer.scss';

import { useTranslation } from 'react-i18next';

import VersionLabel from '../../extra/VersionLabel';

const { REACT_APP_RDN_PAGE, REACT_APP_USER_MANUAL } = process.env;

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="footer">
      <div className="footer__left">
        <VersionLabel />
      </div>
      <div className="footer__center">
        {`Copyright ${new Date().getFullYear()} `}
        <a className="footer-link" href={REACT_APP_RDN_PAGE}>
          rozwiazaniadlaniewidomych.org
        </a>{' '}
        © All Rights Reserved
      </div>
      <div className="footer__right">
        <a className="footer-link" href={REACT_APP_USER_MANUAL}>
          {t('footer.userManual')}
        </a>
      </div>
    </div>
  );
};

export default Footer;
