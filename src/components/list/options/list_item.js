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
  const { owner } = item;

  return (
    <options-bg onClick={(event) => toggleOptions(event)}>
      <options>
        <options-option-yellow onClick={(event) => goToURL(event, toggleOptions, item)}>Go to URL</options-option-yellow>
        <options-option>Expand</options-option>
        {owner && <options-option>Edit</options-option>}
        {owner && <options-option-red onClick={(event) => removeItem(event, toggleOptions, dispatch, item)}>Remove</options-option-red>}
      </options>
    </options-bg>
  );
};
