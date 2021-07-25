import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-http-backend';

i18n
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  // .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          version: 'Version: ',
          400: 'Provided values must be valid',
          unrecognizedProblem: 'Something went wrong...',
          login: {
            title: 'Welcome',
            password: 'Password',
            loginText: 'Log in',
            forgotPassword: 'Forgot Username / Password ?',
            401: 'Wrong email or password',
          },
          recover: {
            title: 'Recover your password',
            button: 'Reset your password',
            401: 'Are you sure you have sent correct email?',
            emailSent: 'Recovery link has been sent to your email',
          },
          setPassword: {
            title: 'Set a new password',
            button: 'Change',
            401: 'Wrong email or expired link',
            password: 'Password',
            repeatPassword: 'Repeat password',
            invalidPasswords: 'Provided passwords must be the same and have 8+ chars',
            expiredToken: 'It looks like your token has expired. \n Reset your password again.',
            changedPassword: 'Password has been changed! \n You will be redirected do login page soon',
          },
          logout: {title: 'You have been logged out', message: 'You will be redirect to login page soon.'},
          map: {},
          sidebar: {contact : 'Contact us'},
          contactForm: {
            description: 'Login problem? Need to contact? Send us a ',
            message: 'message',
          },
          report : {
            button: 'Send report',
            success: 'Report has been sent',
            fail : 'A problem occured'
          },
        },
      },
      pl: {
        translation: {
          version: 'Wersja: ',
          login: {
            title: 'Witamy',
            password: 'Hasło',
            loginText: 'Zaloguj się',
            forgotPassword: 'Nie pamiętasz hasła?',
          },
          map: {},
          sidebar: {},
          report : {
            button: 'Wyślij zgłoszenie',
            success: 'Zgłoszenie zostało wysłane',
            fail : 'Wystąpił problem',
          },
        },
      },
    },
  });

export default i18n;
