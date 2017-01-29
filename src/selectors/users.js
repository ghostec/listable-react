import { createSelector } from 'reselect';

import { getUserId } from './session';
import { profilePicturePath } from '../helpers/s3';

export const getCurrentUser = state => {
  const id = getUserId(state);
  const user = state.users.get(id) && state.users.get(id).toJS();

  return user && {
    ...user,
    picture: profilePicturePath(user)
  };
}
