import React from 'react';

import 'styles/options';

import * as lists from 'actions/lists';
import * as navigation from 'actions/navigation';

const togglePublic = (event, toggleOptions, dispatch, list) => {
  toggleOptions();
  dispatch(lists.patch(list, {
    public: !list.public
  }));
  event.stopPropagation();
}

const removeList = (event, toggleOptions, dispatch, list) => {
  toggleOptions();
  dispatch(lists.remove(list)).then(() => {
    dispatch(navigation.backBegin());
  });
  event.stopPropagation();
}

export default props => {
  const { toggleOptions, dispatch, list } = props;

  return (
    <options-bg onClick={(event) => toggleOptions(event)}>
      <options>
        <options-option onClick={(event) => togglePublic(event, toggleOptions, dispatch, list)}>
          Make {list.public ? 'Private' : 'Public'}
        </options-option>
        <options-option>Edit</options-option>
        <options-option-red onClick={(event) => removeList(event, toggleOptions, dispatch, list)}>Remove</options-option-red>
      </options>
    </options-bg>
  );
};

