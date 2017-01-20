import routes from '../constants/routes';
import redirect from '../helpers/redirect';

export const navigate = (hash) => {
  return {
    type: 'NAVIGATION/NAVIGATE',
    location: routes.lookup(hash),
  };
};

export const backBegin = () => {
  return (dispatch, getState) => {
    const { name, options } = getState().navigation.get('history').peek();
    redirect(routes.generate(name, options));
  };
};

export const backEnd = () => {
  return {
    type: 'NAVIGATION/BACK',
  };
};
