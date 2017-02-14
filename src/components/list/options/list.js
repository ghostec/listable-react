import React from 'react';

import 'styles/options';

import { patch as patchList, remove as removeList } from 'actions/lists';
import { backBegin as navigationBack } from 'actions/navigation';

const optionTogglePublic = (event, toggleOptions, dispatch, list) => {
  toggleOptions();
  dispatch(patchList(list, {
    public: !list.public
  }));
  event.stopPropagation();
}

const optionRemoveList = async (event, toggleOptions, dispatch, list) => {
  event.stopPropagation();
  toggleOptions();
  try {
    await dispatch(removeList(list));
    dispatch(navigationBack());
  } catch(err) {
    console.log(err)
  }
}

export default props => {
  const { toggleOptions, dispatch, list } = props;

  return (
    <options-bg onClick={(event) => toggleOptions(event)}>
      <options>
        <options-option onClick={(event) => optionTogglePublic(event, toggleOptions, dispatch, list)}>
          Make {list.public ? 'Private' : 'Public'}
        </options-option>
        <options-option>Edit</options-option>
        <options-option-red onClick={(event) => optionRemoveList(event, toggleOptions, dispatch, list)}>Remove</options-option-red>
      </options>
    </options-bg>
  );
};

