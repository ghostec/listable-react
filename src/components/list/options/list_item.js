import React from 'react';

import '../../../styles/options';

import * as list_items from '../../../actions/list_items';

const goToURL = (event, toggleOptions, item) => {
  toggleOptions();
  window.open(item.url);
  event.stopPropagation();
}

const removeItem = (event, toggleOptions, dispatch, item) => {
  toggleOptions();
  dispatch(list_items.remove(item));
  event.stopPropagation();
}

export default props => {
  const { item, dispatch, toggleOptions } = props;

  return (
    <options onClick={(event) => toggleOptions(event)}>
      <options-option-yellow onClick={(event) => goToURL(event, toggleOptions, item)}>Go to URL</options-option-yellow>
      <options-option>Expand</options-option>
      <options-option>Edit</options-option>
      <options-option-red onClick={(event) => removeItem(event, toggleOptions, dispatch, item)}>Remove</options-option-red>
    </options>
  );
};
