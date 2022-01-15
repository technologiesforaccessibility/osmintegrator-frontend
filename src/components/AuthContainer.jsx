import Footer from './Footer';
import dots from './../assets/authDots.png';
import logo from './../assets/OsmIntegrator.png';
import {paths} from '../utilities/constants';
import {ReactComponent as RevolveLogo} from './../assets/logos/revolve-logo.svg';
import {ReactComponent as RDNLogo} from './../assets/logos/rozwiazania-logo.svg';
import ztmLogoPath from './../assets/logos/logo_ZTM.png';
import {useLocation} from 'react-router-dom';
import '../stylesheets/auth.scss';

export default function AuthContainer({children}) {
  const location = useLocation();
  const isLoginPage = location.pathname === paths.LOGIN;
  return (
    <div className="auth">
      <div className="auth-image-container">
        <a href={paths.LOGIN} title="login page">
          <img src={logo} alt="logo" />
        </a>
      </div>
      <div className="auth__dots auth__dots--left ">
        <img src={dots} className="auth__image--left" alt="BackgroundLeft"></img>
      </div>
      <div className="auth__container">
        <div className="auth__form-area">
          <div className="auth__form-box">{children}</div>
        </div>
        {isLoginPage && (
          <div className="auth__logos">
            <a
              className="auth__logos--url"
              href="https://rozwiazaniadlaniewidomych.org/"
              target="_blank"
              rel="noreferrer">
              <RDNLogo />
            </a>
            <a className="auth__logos--url" href="https://revolve.healthcare/" target="_blank" rel="noreferrer">
              <RevolveLogo />
            </a>
            <a className="auth__logos--url" href="https://www.metropoliaztm.pl/pl/" target="_blank" rel="noreferrer">
              <img src={ztmLogoPath} alt="Logo ZTM" />
            </a>
          </div>
        )}
      </div>
      <div className="auth__dots auth__dots--right ">
        <img src={dots} className="auth__image--right" alt="BackgroundRight"></img>
      </div>
      <div className="auth__footer">
        <Footer />
      </div>
    </div>
  );
}
