import Immutable from 'immutable';

const initialState = Immutable.Map();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SESSION/SET_TOKEN':
      return state.set('token', action.token);
    case 'SESSION/DISCARD_TOKEN':
      return state.delete('token');
    default:
      return state;
  }
};
