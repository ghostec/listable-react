import { createSelector } from 'reselect';

import { getUserId } from './session';

export const getCurrentUser = state => {
  const id = getUserId(state);
  return state.users.get(id) && state.users.get(id).toJS();
}
