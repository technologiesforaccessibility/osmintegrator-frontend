import i18n from '../translations/i18n';

export const paths = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  RECOVER_PASSWORD: '/auth/recover',
  RESET_PASSWORD: '/Account/ResetPassword',
  MANAGEMENT_PANEL: '/manage',
  PROFILE: '/profile',
  CHANGE_EMAIL: '/profile/change-email',
  CHANGE_PASSWORD: '/profile/change-password',
  REGISTER_CONFIRM: '/auth/register-confirm',
  REGISTER_ACTIVATED: '/Account/ConfirmRegistration',
};

export const roles = {
  ADMIN: 'Admin',
  COORDINATOR: 'Coordinator',
  SUPERVISOR: 'Supervisor',
  EDITOR: 'Editor',
  USER: 'User'
};

export const connectionVisibilityTexts = {
  visible:  i18n.t('connectionVisibility.visible'),
  semiTransparent: i18n.t('connectionVisibility.semiTransparent'),
  hidden: i18n.t('connectionVisibility.hidden'),
};



export const connectedStopVisibilityProps = {
  visible: 'Visible',
  semiTransparent: 'Semi-transparent',
  hidden: 'Hidden',
};

export const connectionLineVisibilityProps = {
  visible: 'Visible',
  hidden: 'Hidden',
};
