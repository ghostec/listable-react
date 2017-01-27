import Immutable from 'immutable';

const initialState = Immutable.Map();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USERS/GET':
      return state.set(action.user.get('_id'), action.user);
    default:
      return state;
  }
};
