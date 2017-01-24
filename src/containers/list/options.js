import React from 'react';
import { connect } from 'react-redux';

import * as list_items from '../../actions/list_items';

import '../../styles/options';

const goToURL = (event, toggleOptions, item) => {
  window.open(item.url);
  toggleOptions();
  event.stopPropagation();
}

const removeItem = (event, toggleOptions, dispatch, item) => {
  dispatch(list_items.remove(item));
  toggleOptions();
  event.stopPropagation();
}

class Options extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item, dispatch, toggleOptions } = this.props;

    return (
      <options onClick={toggleOptions}>
        <options-option-yellow onClick={(event) => goToURL(event, toggleOptions, item)}>Go to URL</options-option-yellow>
        <options-option>Expand</options-option>
        <options-option>Edit</options-option>
        <options-option-red onClick={(event) => removeItem(event, toggleOptions, dispatch, item)}>Remove</options-option-red>
      </options>
    );
  }
};

export default connect()(Options);
