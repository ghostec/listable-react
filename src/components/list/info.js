import React from 'react';

import Options from './options/list';

export default (props) => {
  const { list, toggleOptions, dispatch } = props;
  const options_component = <Options toggleOptions={toggleOptions} dispatch={dispatch} list={list} />

  return (
    <list-info onClick={(event) => toggleOptions(event, options_component)}>
      <list-info-name>{list.name}</list-info-name>
      {!list.public && <img src="images/padlock.svg" />}
    </list-info>
  );
};
