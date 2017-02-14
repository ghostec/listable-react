import Immutable from 'immutable';
import _ from 'lodash';

import * as common from './common';
import { signOut } from './session';
import { apiPath } from 'helpers/common';

export const create = (list) => {
  return dispatch => {
    return dispatch(common.create(list, 'list', 'lists')).then(list => {
      dispatch({
        type: 'USER_LISTS/CREATE',
        user_id: list._userId,
        list_id: list._id
      });
    });
  }
};

export const patch = (list, changes) => {
  return common.patch(list, changes, 'list', 'lists');
};

export const remove = (list) => {
  return dispatch => {
    return dispatch(common.remove(list, 'list', 'lists')).then(() => {
      dispatch({
        type: 'USER_LISTS/CREATE',
        user_id: list._userId,
        list_id: list._id
      }); 
    });
  }
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
    }).then(({ lists, users }) => {
      const lists_normalized = Immutable.fromJS(lists.reduce((obj, list) => {
        obj[list._id] = list;
        return obj;
      }, {}));

      const user_lists = lists.map(list => list._id.toString());

      const state_lists = getState().lists.filter(list => {
        return _.find(user_lists, el => el == list.get('_id').toString());
      });

      if(!lists_normalized.equals(state_lists)) {
        dispatch({ type: 'LISTS/BATCH', lists: lists_normalized });
        dispatch({ type: 'USER_LISTS/FROM_USER', user_id, lists: Immutable.List(user_lists) });

        
        dispatch({ type: 'USERS/BATCH', users: users_normalized });
      }

      const users_normalized = Immutable.fromJS(users.reduce((obj, user) => {
        obj[user._id] = user;
        return obj;
      }, {}));

      const state_users = getState().users.filter(user => {
        return _.find(users, el => el._id.toString() == user.get('_id').toString());
      });

      if(!users_normalized.equals(state_users)) {
        dispatch({ type: 'USERS/BATCH', users: users_normalized });
      }
    }).catch(err => {
      if(!user_id) dispatch(signOut);
    }); 
  }
};

export const get = list_id => {
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
    }).then(list => {
      const normalized = Immutable.fromJS(list);
      const state_list = getState().lists.get(normalized.get('_id'));

      if(!normalized.equals(state_list)) {
        dispatch({ type: 'LISTS/GET', list: normalized });
      }
    }); 
  }
};

export const save = list_id => {
  return (dispatch, getState) => {
    const token = getState().session.get('token');

    return fetch(`${apiPath}/lists/${list_id}/save`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }).then(response => {
      if(response.status >= 400) {
        throw new Error("Bad response from server");
      }
      else if(response.status == 204) {
        const user_id = getState().session.get('user_id');
        dispatch({ type: 'USER_LISTS/CREATE', user_id, list_id })
      }
    });
  }
}

export const search = (v) => {
  return (dispatch, getState) => {
    const token = getState().session.get('token');

    return fetch(`${apiPath}/lists/search?v=${escape(v)}`, {
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
    });
  }
}
