import React from 'react';
import { connect } from 'react-redux';

import Items from '../../components/list/items';
import * as list_items from '../../actions/list_items';

class ItemsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDone = this.toggleDone.bind(this);
  }

  toggleDone(event, list_item) {
    this.props.dispatch(list_items.toggleDone(list_item));
    event.stopPropagation();
  }

  render() {
    const { list_items, toggleOptions } = this.props;
    const { toggleDone } = this;

    return <Items list_items={list_items} toggleDone={toggleDone} toggleOptions={toggleOptions} />;
  }
};

export default connect()(ItemsContainer);
