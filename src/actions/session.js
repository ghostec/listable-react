import config from '../config';

export const signIn = (email, password) => {
  return (dispatch) => {
    return fetch(`${config.apiURL}/users/authenticate`, {
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
    .then(data => dispatch({ type: 'SESSION/SET_TOKEN', token: data.token }));
  }
}

export const signOut = () => {
  return (dispatch) => {
    dispatch({ type: 'SESSION/DISCARD_TOKEN' })
  }
}
