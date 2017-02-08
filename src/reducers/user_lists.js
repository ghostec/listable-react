import Immutable from 'immutable';

const initialState = Immutable.Map();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LISTS/FROM_USER':
      return state.set(action.user_id, action.lists);
    default:
      return state;
  }
};
