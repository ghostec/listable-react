import Immutable from 'immutable';
import _ from 'lodash';

import { apiPath } from '../helpers/common';

export const create = (obj, singular, plural, post_url) => {
  return (dispatch, getState) => {
    const token = getState().session.get('token');

    return fetch(post_url || `${apiPath}/${_.toLower(plural)}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token,
        ...obj
      })
    })
    .then(response => {
      if (response.status != 422 && response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(json => {
      return new Promise((resolve, reject) => {
        if(json.errors) return reject(json.errors);
        dispatch({ type: `${_.toUpper(plural)}/CREATE`, [_.toLower(singular)]: Immutable.fromJS(json) });
        return resolve(json);
      });
    });
  };
};

export const patch = (obj, changes, singular, plural) => {
  return (dispatch, getState) => {
    const token = getState().session.get('token');

    return fetch(`${apiPath}/${_.toLower(plural)}/${obj._id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(changes)
    }).then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }

      const patched = Immutable.fromJS({
        ...obj,
        ...changes
      });

      dispatch({
        type: `${_.toUpper(plural)}/PATCH`, [_.toLower(singular)]: patched
      }); 
    });
  };
};

export const remove = (obj, singular, plural, delete_url) => {
  return (dispatch, getState) => {
    const token = getState().session.get('token');

    return fetch(delete_url || `${apiPath}/${_.toLower(plural)}/${obj._id}`, {
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
        type: `${_.toUpper(plural)}/DELETE`, [_.toLower(singular)]: Immutable.fromJS(obj)
      }); 
    });
  };
};
