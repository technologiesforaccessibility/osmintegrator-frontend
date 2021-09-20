import VersionLabel from './VersionLabel';

import './../stylesheets/footer.scss';

const Footer = () => {

  return (
    <div className="footer">
      <div className="footer__left">
        <VersionLabel />
      </div>
      <div className="footer__center">
      Copyright © 2021 | rozwiazaniadlaniewidomych.org | All Rights Reserved
      </div>
      <div className="footer__right">

      </div>
    </div>
  );
};

export default Footer;