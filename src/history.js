import createHistory from 'history/createBrowserHistory';

import routes from 'constants/routes';
import routesComponents from 'constants/routes_components';
import config from './config';

export const history = createHistory();

export const resolve = location => {
  const path = location.pathname.replace(new RegExp(`^(${config.rootPath})`), '');
  const route = routes.lookup(path);
  return routesComponents[route.name || 'default'];
}
