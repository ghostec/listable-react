import Immutable from 'immutable';
import _ from 'lodash';

import * as common from './common';
import { signOut } from './session';
import { apiPath } from '../helpers/common';

export const create = (list) => {
  return common.create(list, 'list', 'lists');
};

export const patch = (list, changes) => {
  return common.patch(list, changes, 'list', 'lists');
};

export const remove = (list) => {
  return common.remove(list, 'list', 'lists');
};

export const fromUser = (user_id) => {
  return (dispatch, getState) => {
    const token = getState().session.get('token');

    return fetch(`${apiPath}/users/${user_id}/lists`, {
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
    }).then(lists => {
      const normalized = Immutable.fromJS(lists.reduce((obj, list) => {
        obj[list._id] = list;
        return obj;
      }, {}));

      const state_lists = getState().lists;

      if(!normalized.equals(state_lists)) {
        dispatch({ type: 'LISTS/FROM_USER', lists: normalized });
      }
    }).catch(err => {
      if(!user_id) dispatch(signOut);
    }); 
  }
};

export const get = (list_id) => {
  return (dispatch, getState) => {
    const token = getState().session.get('token');

    return fetch(`${apiPath}/lists/${list_id}`, {
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
    .then(list => {
      const normalized = Immutable.fromJS(list);
      const state_list = getState().lists.get(normalized.get('_id'));

      if(!normalized.equals(state_list)) {
        dispatch({ type: 'LISTS/GET', list: normalized });
      }
    }); 
  }
};
