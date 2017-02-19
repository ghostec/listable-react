import { createSelector } from 'reselect';

import { history } from '../history';
import routes from 'constants/routes';

export const getResourceId = state => {
  const { location } = history;
  const route = routes.lookup(location.pathname);
  return route.options && route.options.id;
}

export const getURLParams = state => {
  const { pathname, search } = history.location;
  const route = routes.lookup(pathname.replace(/\/$/, '') + search);
  return route.options;
}
