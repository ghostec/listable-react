import React from 'react';

import 'styles/options';

import { sessionSignOut } from 'actions/session';

const signOut = (event, toggleOptions, dispatch) => {
  dispatch(sessionSignOut());
}

export default props => {
  const { dispatch, toggleOptions } = props;

  return (
    <options-wrap>
      <options-option onClick={event => signOut(event, toggleOptions, dispatch)}>Sign out</options-option>
    </options-wrap>
  );
};
