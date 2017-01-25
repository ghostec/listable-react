import React from 'react';
import { connect } from 'react-redux';

import Items from '../../components/list/items';
import * as list_items from '../../actions/list_items';

class ItemsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { list_items, user_list_items, dispatch, toggleOptions } = this.props;

    return <Items list_items={list_items} user_list_items={user_list_items} dispatch={dispatch} toggleOptions={toggleOptions} />;
  }
};

const mapStateToProps = state => {
  const list_id = state.navigation.get('location').options.id;
  const list = state.lists.get(list_id) && state.lists.get(list_id).toJS();
  
  const list_items = state.list_items.toJS();
  const sorted = _.map(list_items, v => v).sort((a, b) => {
    return (a.updated_at < b.updated_at ? 1 : -1)
  });

  const user_list_items = state.user_list_items.get(list_id) && state.user_list_items.get(list_id).toJS();

  return {
    user_list_items,
    list_items: sorted
  };
}

export default connect(mapStateToProps)(ItemsContainer);
