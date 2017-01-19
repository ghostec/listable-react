import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  token: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SESSION/SET_TOKEN':
      return state.set('token', action.token);
    case 'SESSION/DISCARD_TOKEN':
      return state.set('token', null);
    default:
      return state;
  }
};
