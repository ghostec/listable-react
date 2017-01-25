import Immutable from 'immutable';

import * as common from './common';
import { apiPath } from '../helpers/common';

export const create = (list_id, list_items_ids) => {
  return common.create({ list_id, list_item_ids }, 'user_list_item', 'user_list_items');
};

export const patch = (user_list_item, changes) => {
  return common.patch(user_list_item, changes, 'user_list_item', 'user_list_items');
};

export const fromList = (list_id) => {
  return (dispatch, getState) => {
    const token = getState().session.get('token');

    return fetch(`${apiPath}/lists/${list_id}/user_list_items`, {
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
    .then(user_list_items => {
      const normalized = Immutable.fromJS(user_list_items.reduce((obj, user_list_item) => {
        obj[user_list_item._listItemId] = user_list_item;
        return obj;
      }, {}));

      const state_user_list_items = getState().user_list_items.get(list_id);

      if(!normalized.equals(state_user_list_items)) {
        dispatch({
          type: 'USER_LIST_ITEMS/FROM_LIST', list_id, user_list_items: normalized
        });
      }
    }); 
  };
};

