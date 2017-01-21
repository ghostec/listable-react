import Immutable from 'immutable';

import config from '../config';

export const create = (name) => {
  return (dispatch, getState) => {
    const token = getState().session.get('token');

    return fetch(`${config.apiURL}/lists`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token,
        name
      })
    }).then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(list => dispatch({ type: 'LISTS/CREATE', list: Immutable.fromJS(list) }));
  }
};

export const index = () => {
  return (dispatch, getState) => {
    const token = getState().session.get('token');

    return fetch(`${config.apiURL}/lists`, {
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
    .then(lists => {
      const normalized = Immutable.fromJS(lists.reduce((obj, list) => {
        obj[list._id] = list;
        return obj;
      }, {}));

      const state_lists = getState().lists;

      if(!normalized.equals(state_lists)) {
        dispatch({ type: 'LISTS/INDEX', lists: normalized });
      }
    }); 
  }
};

export const get = ({ id }) => {
  return (dispatch, getState) => {
    const token = getState().session.get('token');

    return fetch(`${config.apiURL}/lists/${id}`, {
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
