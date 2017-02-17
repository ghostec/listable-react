import React from 'react';

import 'styles/options';

import { patch as patchList, remove as removeList } from 'actions/lists';
import { history } from 'history';

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
    history.goBack();
  } catch(err) {
    console.log(err)
  }
}

const optionEditList = (event, toggleOptions, toggleForm) => {
  event.stopPropagation();
  toggleOptions();
  toggleForm();
}

export default props => {
  const { toggleOptions, dispatch, list, toggleForm } = props;
  const { owner } = list;

  return (
    <options-bg onClick={(event) => toggleOptions(event)}>
      <options>
        {owner && <options-option onClick={(event) => optionTogglePublic(event, toggleOptions, dispatch, list)}>
          Make {list.public ? 'Private' : 'Public'}
        </options-option>}
        {owner && <options-option onClick={event => optionEditList(event, toggleOptions, toggleForm)}>Edit</options-option>}
        <options-option-red onClick={(event) => optionRemoveList(event, toggleOptions, dispatch, list)}>Remove</options-option-red>
      </options>
    </options-bg>
  );
}
