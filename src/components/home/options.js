import React from 'react';

import '../../styles/options';

import * as session from '../../actions/session';

const signOut = (event, toggleOptions, dispatch) => {
  dispatch(session.signOut());
}

export default props => {
  const { dispatch, toggleOptions } = props;

  return (
    <options onClick={(event) => toggleOptions(event)}>
      <options-option onClick={event => signOut(event, toggleOptions, dispatch)}>Sign out</options-option>
    </options>
  );
};
