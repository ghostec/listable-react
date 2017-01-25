import { apiPath } from '../helpers/common';

export const signIn = (email, password) => {
  return (dispatch) => {
    return fetch(`${apiPath}/users/authenticate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(data => dispatch({ type: 'SESSION/SET_TOKEN', ...data }));
  }
}

export const signUp = (name, email, password) => {
  return (dispatch) => {
    return fetch(`${apiPath}/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    }).then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(data => dispatch({ type: 'SESSION/SET_TOKEN', ...data }));
  }
}

export const signOut = () => {
  return (dispatch) => {
    dispatch({ type: 'SESSION/DISCARD_TOKEN' })
  }
}
