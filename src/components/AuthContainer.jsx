import Footer from './Footer';
import dots from './../assets/authDots.png';

import '../stylesheets/auth.scss';

export default function AuthContainer({children}) {
  return (
    <>
      <div className="auth__container">
        <div className="auth__dots">
          <img src={dots} className="auth__image--left" alt="BackgroundLeft"></img>
        </div>
        <div className="auth__form-area">
          <div className="auth__form-box">{children}</div>
        </div>
        <div className="auth__dots">
          <img src={dots} className="auth__image--right" alt="BackgroundRight"></img>
        </div>
      </div>
      <div className="auth__footer">
        <Footer />
      </div>
    </>
  );
}
