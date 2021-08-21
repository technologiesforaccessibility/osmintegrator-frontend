import React from 'react';

import VersionLabel from './VersionLabel';

import '../stylesheets/auth.scss';

export default function AuthLayout({children}) {
  return (
    <React.Fragment>
      <div className="auth-area">
        <div className="auth-area__version">
          <VersionLabel />
        </div>
        <div className="form-div">{children}</div>
      </div>
    </React.Fragment>
  );
};
