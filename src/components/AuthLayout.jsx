import React from 'react';

import '../stylesheets/auth.scss';

export default function AuthLayout({ children }) {
  return (
    <React.Fragment>
      <div className="auth-area">
        <div className="form-div">
          {children}
        </div>
      </div>
    </React.Fragment>
  );
}
