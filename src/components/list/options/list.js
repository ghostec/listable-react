import React from 'react';

import '../../../styles/options';

import * as lists from '../../../actions/lists';

const togglePublic = (event, toggleOptions, dispatch, list) => {
  toggleOptions();
  dispatch(lists.patch(list, {
    public: !list.public
  }));
  event.stopPropagation();
}

export default props => {
  const { toggleOptions, dispatch, list } = props;

  return (
    <options onClick={(event) => toggleOptions(event)}>
      <options-option onClick={(event) => togglePublic(event, toggleOptions, dispatch, list)}>
        Make {list.public ? 'Private' : 'Public'}
      </options-option>
      <options-option>Edit</options-option>
    </options>
  );
};

