import Immutable from 'immutable';
import _ from 'lodash';

import * as common from './common';
import { apiPath } from '../helpers/common';
import { rawProfilePicturePath } from '../helpers/s3';
import { isProfilePictureUpdated, setProfilePictureInDbUser } from '../helpers/users';

export const setRawProfilePicture = key => {
  return (dispatch, getState) => {
    const user_id = getState().session.get('user_id');

    dispatch({
      type: 'USERS/SET_RAW_PROFILE_PICTURE',
      user_id,
      picture: Immutable.Map({
        url: rawProfilePicturePath(key),
        raw: true
      })
    });
  }
}

export const patch = (user, changes) => {
  return common.patch(user, changes, 'user', 'users');
};

export const get = (user_id) => {
  return (dispatch, getState) => {
    const token = getState().session.get('token');

    return fetch(`${apiPath}/users/${user_id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }).then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(user => {
      const state_user = getState().users.get(user._id);

      const normalized = Immutable.fromJS(
        isProfilePictureUpdated(state_user && state_user.toJS(), user) ?
          user : setProfilePictureInDbUser(state_user.toJS(), user)
      );

      if(!normalized.equals(state_user)) {
        dispatch({
          type: 'USERS/GET',
          user: normalized
        });
      }
    }); 
  }
};

