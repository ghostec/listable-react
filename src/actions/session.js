import { apiPath } from 'helpers/common';
import routes from 'constants/routes';
import * as navigation from 'actions/navigation';

export const signIn = (email, password) => {
  return async dispatch => {
    const response = await fetch(`${apiPath}/users/authenticate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const json = await response.json();

    if(response.status >= 400) {
      if(json.errors) {
        if(json.errors.user) throw new Error(json.errors.user.message);
      }
      throw new Error("Bad response from server.");
    }

    dispatch({ type: 'SESSION/SET_TOKEN', ...json });
  }
}

export const signUp = (name, email, password) => {
  return async (dispatch) => {
    const response = await fetch(`${apiPath}/users`, {
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
    });

    const json = await response.json();

    if(response.status >= 400) {
      if(json.errors) {
        if(json.errors.name) throw new Error(json.errors.name.message);
        if(json.errors.email) throw new Error(json.errors.email.message);
        if(json.errors.password) throw new Error(json.errors.password.message);
      }
      throw new Error("Bad response from server.");
    }

    dispatch({ type: 'SESSION/SET_TOKEN', ...json });
  }
}

export const signOut = () => {
  return (dispatch) => {
    dispatch(navigation.backBegin(routes.generate('root')));
    dispatch({ type: 'SESSION/DISCARD_TOKEN' });
  }
}
