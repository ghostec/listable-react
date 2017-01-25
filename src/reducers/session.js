import Immutable from 'immutable';

const initialState = Immutable.Map();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SESSION/SET_TOKEN':
      return state.set('token', action.token).set('user_id', action.user_id);
    case 'SESSION/DISCARD_TOKEN':
      return state.delete('token').delete('user_id');
    default:
      return state;
  }
};
