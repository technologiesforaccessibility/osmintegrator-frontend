import store from '../redux/store';
import {paths, roles} from './constants';

const { ADMIN, SUPERVISOR, EDITOR } = roles;

export const PROTECTED_ROUTES = [
  {
    path: paths.HOME,
    allowedRoles: [ADMIN, SUPERVISOR, EDITOR]
  },
  {
    path: paths.MANAGEMENT_PANEL,
    allowedRoles: [ADMIN, SUPERVISOR]
  }
];

export function hasAccess(path) {
  const state = store.getState();
  const { loggedInUserRoles = [] } = state.auth;

  const protectedRoute = PROTECTED_ROUTES.find((route) => {
    if (Array.isArray(path)) {
      return path.includes(route.path);
    }

    return route.path === path;
  });

  if (protectedRoute) {
    const isUserRoleAllowed = protectedRoute.allowedRoles.some((role) => loggedInUserRoles.includes(role));

    if (!isUserRoleAllowed) {
      return false;
    }
  }

  return true;
}
