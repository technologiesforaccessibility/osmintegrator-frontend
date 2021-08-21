import store from '../redux/store';
import {paths, roles} from './constants';

const { ADMIN, COORDINATOR, SUPERVISOR, EDITOR } = roles;

export const PROTECTED_ROUTES = [
  {
    path: paths.HOME,
    allowedRoles: [ADMIN, COORDINATOR, SUPERVISOR, EDITOR]
  },
  {
    path: paths.MANAGEMENT_PANEL,
    allowedRoles: [ADMIN, COORDINATOR, SUPERVISOR]
  }
];

export function hasAccessToPath(path) {
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
