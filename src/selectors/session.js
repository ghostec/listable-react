import { createSelector } from 'reselect';

export const getUserId = state => {
  return state.session && state.session.get('user_id');
}

export const includeOwner = (state, obj) => {
  return {
    ...obj,
    owner: (getUserId(state) === obj._userId)
  };
}
