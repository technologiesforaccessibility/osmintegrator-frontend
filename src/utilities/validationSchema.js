import i18n from '../translations/i18n';

import {object, string, ref} from 'yup';

export const RegisterSchema = object().shape({
  username: string().min(3, i18n.t('register.usernamePrompt')).required(i18n.t('register.usernameRequiredError')),
  email: string().email(i18n.t('register.emailInvalidError')).required('register.emailRequiredError'),
  password1: string().min(8, i18n.t('register.passwordPrompt')).required(i18n.t('register.passwordPlaceholder')),
  password2: string()
    .oneOf([ref('password1')], i18n.t('register.passwordRefError'))
    .required(i18n.t('register.passwordConfirmRequiredError')),
});

export const LoginSchema = object().shape({
  email: string().email(i18n.t('register.emailInvalidError')).required('Wpisz adres email'),
  password: string().min(8, i18n.t('register.passwordPrompt')).required(i18n.t('register.passwordPlaceholder')),
});
