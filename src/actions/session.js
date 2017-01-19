const apiURL = '//192.168.1.2/api';

export const signIn = (email, password) => {
  return (dispatch) => {
    return fetch(`#{apiURL}/authenticate`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(
      response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json()
      })
      .then(
        data => dispatch({ type: 'SESSION/SET_TOKEN', token: data.token })
      )
  }
}

export const signOut = () => {
  return (dispatch) => {
    dispatch({ type: 'SESSION/DISCARD_TOKEN' })
  }
}
