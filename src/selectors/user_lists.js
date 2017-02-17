import Immutable from 'immutable';

export const getUserLists = (state, user_id) => {
  return state.user_lists.get(user_id, Immutable.Map()).toJS();
}
