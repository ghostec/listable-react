import React from 'react';

import '../../styles/options';

import * as session from '../../actions/session';

const signOut = (event, toggleOptions, dispatch) => {
  dispatch(session.signOut());
}

export default props => {
  const { dispatch, toggleOptions } = props;

  return (
    <options-wrap>
      <options-option onClick={event => signOut(event, toggleOptions, dispatch)}>Sign out</options-option>
    </options-wrap>
  );
};
