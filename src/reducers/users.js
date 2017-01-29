import Immutable from 'immutable';

const initialState = Immutable.Map();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USERS/GET':
      return state.set(action.user.get('_id'), action.user);
    case 'USERS/SET_RAW_PROFILE_PICTURE':
      return state.setIn([action.user_id, 'picture'], action.picture);
    default:
      return state;
  }
};
