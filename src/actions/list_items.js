import Immutable from 'immutable';

import config from '../config';

export const create = (list_id, url) => {
  return (dispatch, getState) => {
    const token = getState().session.get('token');

    return fetch(`${config.apiURL}/list_items`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token,
        url,
        list_id
      })
    }).then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(list_item => dispatch({ type: 'LIST_ITEMS/CREATE', list_item: Immutable.fromJS(list_item) }));
  }
};

export const fromList = (list_id) => {
  return (dispatch, getState) => {
    const token = getState().session.get('token');

    return fetch(`${config.apiURL}/lists/${list_id}/list_items`, {
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
    .then(list_items => {
      const normalized = Immutable.fromJS(list_items.reduce((obj, list_item) => {
        obj[list_item._id] = list_item;
        return obj;
      }, {}));

      const state_list_items = getState().list_items;

      if(!normalized.equals(state_list_items)) {
        dispatch({
          type: 'LIST_ITEMS/FROM_LIST', list_items: normalized
        });
      }
    }); 
  }
};
