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
    .then(list => dispatch({ type: 'LISTS/CREATE', list }));
  }
};
