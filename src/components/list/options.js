import React from 'react';

import '../../styles/options';

const Options = props => {
  const { item, goToURL, toggleOptions, removeItem } = props;

  return (
    <options onClick={toggleOptions}>
       <options-option-yellow onClick={(event) => goToURL(event, item)}>Go to URL</options-option-yellow>
       <options-option>Expand</options-option>
       <options-option>Edit</options-option>
       <options-option-red onClick={(event) => removeItem(event, item)}>Remove</options-option-red>
    </options>
  );
};

export default Options;
