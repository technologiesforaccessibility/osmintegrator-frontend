import FullfilledDotIcon from '@mui/icons-material/FiberManualRecord';
import OutlinedDotIcon from '@mui/icons-material/FiberManualRecordOutlined';
import HalfFullfilledDotIcon from '@mui/icons-material/FiberManualRecordTwoTone';
import i18n from 'translations/i18n';

export const paths = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  RECOVER_PASSWORD: '/auth/recover',
  RECOVER_CONFIRM: '/auth/recover-confirm',
  RESET_PASSWORD: '/Account/ResetPassword',
  MANAGEMENT_PANEL: '/manage',
  PROFILE: '/profile',
  CHANGE_EMAIL: '/profile/change-email',
  CHANGE_PASSWORD: '/profile/change-password',
  CHANGE_PASSWORD_CONFIRM: '/profile/change-password-confirm',
  REGISTER_CONFIRM: '/auth/register-confirm',
  REGISTER_ACTIVATED: '/Account/ConfirmRegistration',
};

export const roles = {
  ADMIN: 'Admin',
  COORDINATOR: 'Coordinator',
  SUPERVISOR: 'Supervisor',
  EDITOR: 'Editor',
  USER: 'User',
};

export const connectionVisibility = {
  hidden: {
    text: i18n.t('connectionVisibility.hidden'),
    opacityValue: 0,
    icon: () => <OutlinedDotIcon />,
  },
  semiTransparent: {
    text: i18n.t('connectionVisibility.semiTransparent'),
    opacityValue: 0.5,
    icon: () => <HalfFullfilledDotIcon />,
  },
  visible: {
    text: i18n.t('connectionVisibility.visible'),
    opacityValue: 1,
    icon: () => <FullfilledDotIcon />,
  },
};

export const localStorageStopTypes = {
  connected: 'connectedStopVisibility',
  unconnected: 'unconnectedStopVisibility',
  approved: 'stopWithApprovedConnectionVisibility',
};
