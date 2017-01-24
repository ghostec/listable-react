import React from 'react';

import '../../../styles/options';

import * as list_items from '../../../actions/lists';

export default props => {
  const { dispatch, toggleOptions } = props;

  return (
    <options onClick={toggleOptions}>
      <options-option>Make Public</options-option>
      <options-option>Edit</options-option>
    </options>
  );
};

