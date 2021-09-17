import React from 'react';

import VersionLabel from './VersionLabel';
import dots from './../assets/authDots.png';

import '../stylesheets/auth.scss';

export default function AuthContainer({children}) {
  return (
    <>
      <div className="auth__version">
        <VersionLabel />
      </div>
      <div className="auth__container">
        <div className="auth__dots">
          <img src={dots} className="auth__image--left"></img>
        </div>
        <div className="auth__form-area">
          <div className="auth__form-box">
          {children}
          </div>
          </div>
        <div className="auth__dots">
          <img src={dots} className="auth__image--right"></img>
        </div>
      </div>
    </>
  );
}
