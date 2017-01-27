import Immutable from 'immutable';
import _ from 'lodash';

import * as common from './common';
import { apiPath } from '../helpers/common';

export const patch = (list, changes) => {
  return common.patch(list, changes, 'list', 'lists');
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
      const normalized = Immutable.fromJS(user);
      const state_user = getState().users.get(user._id);

      if(!normalized.equals(state_user)) {
        dispatch({ type: 'USERS/GET', user: normalized });
      }
    }); 
  }
};

