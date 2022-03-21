import './translations/i18n';
import 'normalize.css';
import 'stylesheets/index.scss';

import App from 'components/App';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="...is loading">
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
