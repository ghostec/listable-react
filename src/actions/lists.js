import Immutable from 'immutable';

import { apiPath } from '../helpers/common';

export const create = (name) => {
  return (dispatch, getState) => {
    const token = getState().session.get('token');

    return fetch(`${apiPath}/lists`, {
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

    return fetch(`${apiPath}/lists`, {
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

    return fetch(`${apiPath}/lists/${id}`, {
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

export const togglePublic = (list) => {
  return (dispatch, getState) => {
    const token = getState().session.get('token');

    return fetch(`${apiPath}/lists/${list._id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify({
        public: !list.public
      })
    }).then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }

      const patched_list = Immutable.fromJS({
        ...list,
        public: !list.public
      });

      dispatch({
        type: 'LISTS/TOGGLE_PUBLIC', list: patched_list
      }); 
    });
  };
};

export const remove = (list) => {
  return (dispatch, getState) => {
    const token = getState().session.get('token');

    return fetch(`${apiPath}/lists/${list._id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }).then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }

      dispatch({
        type: 'LISTS/DELETE', list
      }); 
    });
  };
};
