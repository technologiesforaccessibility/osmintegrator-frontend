import i18n from '../translations/i18n';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

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
  USER: 'User',
};

export const connectionVisibility = {
  hidden: {
    text: i18n.t('connectionVisibility.hidden'),
    opacityValue: 0,
    icon: () => <StarOutlineIcon />,
  },
  semiTransparent: {
    text: i18n.t('connectionVisibility.semiTransparent'),
    opacityValue: 0.5,
    icon: () => <StarHalfIcon />,
  },
  visible: {
    text: i18n.t('connectionVisibility.visible'),
    opacityValue: 1,
    icon: () => <StarIcon />,
  },
};

export const localStorageStopTypes = {
  connected: 'connectedStopVisibility',
  unconnected: 'unconnectedStopVisibility',
  approved: 'stopWithApprovedConnectionVisibility',
};
