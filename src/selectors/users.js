import { createSelector } from 'reselect';

import { getUserId } from './session';

export const getCurrentUser = state => {
  const id = getUserId(state);
  return state.users.get(id) && state.users.get(id).toJS();
}

export const getUsers = state => {
  return state.users && state.users.toJS();
}

export const getUser = (state, user_id) => {
  return user_id && state.users && state.users.get(user_id).toJS();
}
