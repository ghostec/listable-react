import routes from '../constants/routes';
import redirect from '../helpers/redirect';

export const navigate = (hash) => {
  return {
    type: 'NAVIGATION/NAVIGATE',
    location: routes.lookup(hash),
  };
};

export const backBegin = default_route => {
  return (dispatch, getState) => {
    const { name = undefined, options = undefined } = getState().navigation.get('history').peek() || {};
    const route = (name && routes.generate(name, options)) || default_route;
    redirect(route);
  };
};

export const backEnd = () => {
  return {
    type: 'NAVIGATION/BACK',
  };
};
