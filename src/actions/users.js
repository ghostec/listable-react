import Immutable from 'immutable';
import _ from 'lodash';

import * as common from './common';
import { signOut } from './session';
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
        key,
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
    }).then(user => {
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
    }).catch(err => {
      if(!user_id) dispatch(signOut());
    }); 
  }
};

export const forgotPassword = async email => {
  const response = await fetch(`${apiPath}/users/forgot_password`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email
    })
  });

  if(response.status >= 400) {
    const json = await response.json();
    if(json.errors && json.errors.user) throw new Error(json.errors.user.message);
    throw new Error('Bad response from server.');
  }
}

export const resetPassword = async (user_id, token, password) => {
  const response = await fetch(`${apiPath}/users/reset_password`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id,
      token,
      password
    })
  });

  if(response.status >= 400) {
    const json = await response.json();
    if(json.errors && json.errors.user) throw new Error(json.errors.user.message);
    throw new Error('Bad response from server.');
  }
}
