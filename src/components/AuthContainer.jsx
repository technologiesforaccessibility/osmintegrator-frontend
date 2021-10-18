import Footer from './Footer';
import dots from './../assets/authDots.png';
import logo from './../assets/OsmIntegrator.png';
import {paths} from '../utilities/constants';
import {ReactComponent as RevolveLogo} from './../assets/logos/revolve-logo.svg';
import {ReactComponent as RDNLogo} from './../assets/logos/rozwiazania-logo.svg';

import '../stylesheets/auth.scss';

export default function AuthContainer({children}) {
  return (
    <>
      <a className="auth-image-container" href={paths.LOGIN}>
        <img src={logo} alt="logo" />
      </a>
      <div className="auth__container">
        <div className="auth__dots auth__dots--left ">
          <img src={dots} className="auth__image--left" alt="BackgroundLeft"></img>
        </div>
        <div className="auth__form-area">
          <div className="auth__form-box">{children}</div>
        </div>
        <div className="auth__logos">
          <a
            className="auth__logos--rdn"
            href="https://rozwiazaniadlaniewidomych.org/"
            target="_blank"
            rel="noreferrer">
            <RDNLogo />
          </a>
          <a className="auth__logos--revolve" href="https://revolve.healthcare/" target="_blank" rel="noreferrer">
            <RevolveLogo />
          </a>
        </div>
        <div className="auth__dots auth__dots--right ">
          <img src={dots} className="auth__image--right" alt="BackgroundRight"></img>
        </div>
      </div>
      <div className="auth__footer">
        <Footer />
      </div>
    </>
  );
}
