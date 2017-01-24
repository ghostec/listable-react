import Immutable from 'immutable';
import _ from 'lodash';

import { apiPath } from '../helpers/common';

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

export const remove = (obj, singular, plural) => {
  return (dispatch, getState) => {
    const token = getState().session.get('token');

    return fetch(`${apiPath}/${_.toLower(plural)}/${list._id}`, {
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
