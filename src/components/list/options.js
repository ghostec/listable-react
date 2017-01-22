import React from 'react';

import '../../styles/options';

const Options = props => {
  const { item, goToURL, toggleOptions } = props;

  return (
    <options onClick={toggleOptions}>
       <options-option-yellow onClick={(event) => goToURL(event, item)}>Go to URL</options-option-yellow>
       <options-option>Expand</options-option>
       <options-option>Edit</options-option>
       <options-option-red>Remove</options-option-red>
    </options>
  );
};

export default Options;
