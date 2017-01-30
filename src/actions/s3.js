import _ from 'lodash';

import config from '../config';
import * as common from '../helpers/common';
import * as users from './users';

export const uploadProfilePicture = (file) => {
  return (dispatch, getState) => {
    const token = getState().session.get('token');

    return fetch(`${common.apiPath}/aws/s3/policy/profile`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filename: file.name,
        filetype: file.type,
        token
      })
    }).then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then((response) => {
      let formData = new FormData();
      _.forEach(response.fields, (value, key) => formData.append(key, value));
      formData.append('file', file);

      fetch(`https://${config.s3.bucket}.s3.amazonaws.com`, {
        method: 'POST',
        body: formData
      }).then(response2 => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        dispatch(users.setRawProfilePicture(response.fields.key));
      })
    });
  };
};
