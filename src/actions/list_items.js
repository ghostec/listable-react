import Immutable from 'immutable';

import * as common from './common';
import { apiPath } from '../helpers/common';

export const create = (list_id, url, name) => {
  return dispatch => {
    const post_url = `${apiPath}/lists/${list_id}/list_items`;
    return dispatch(common.create({
      list_id, url, name
    }, 'list_item', 'list_items', post_url)).then(json => {
      dispatch({
        type: 'USER_LIST_ITEMS/CREATE',
        user_list_item: Immutable.fromJS(json.user_list_item)
      });
    });
  }
};

export const patch = (list_item, changes) => {
  return common.patch(list_item, changes, 'list_item', 'list_items');
};

export const remove = (list_item) => {
  const delete_url = `${apiPath}/lists/${list_item._listId}/list_items/${list_item._id}`;
  return common.remove(list_item, 'list_item', 'list_items', delete_url);
};

export const fromList = (list_id) => {
  return (dispatch, getState) => {
    const token = getState().session.get('token');

    return fetch(`${apiPath}/lists/${list_id}/list_items`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }).then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.json();
    })
    .then(list_items => {
      const normalized = Immutable.fromJS(list_items.reduce((obj, list_item) => {
        obj[list_item._id] = list_item;
        return obj;
      }, {}));

      const state_list_items = getState().list_items.get(list_id);

      if(!normalized.equals(state_list_items)) {
        dispatch({
          type: 'LIST_ITEMS/FROM_LIST', list_id, list_items: normalized
        });
      }
    }); 
  };
};
