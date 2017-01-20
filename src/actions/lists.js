import Immutable from 'immutable';

import config from '../config';

export const create = (name) => {
  return (dispatch, getState) => {
    const token = getState().session.get('token');

    return fetch(`${config.apiURL}/list`, {
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
    .then(list => dispatch({ type: 'LISTS/CREATE', list }));
  }
};

export const index = () => {
  return (dispatch, getState) => {
    const token = getState().session.get('token');

    return fetch(`${config.apiURL}/list`, {
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

      if(!normalized.equals(state_lists)) dispatch({ type: 'LISTS/INDEX', lists: normalized })
    }); 
  }
};