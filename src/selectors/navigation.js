import { createSelector } from 'reselect';

import { history } from '../history';
import routes from 'constants/routes';

export const getResourceId = state => {
  const { location } = history;
  const route = routes.lookup(location.pathname);
  return route.options && route.options.id;
}
